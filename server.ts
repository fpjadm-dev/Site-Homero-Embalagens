import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser with high limit for Base64 images
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  const dataFilePath = path.join(process.cwd(), "src", "assets", "custom_images_data.json");
  const publicImagesDir = path.join(process.cwd(), "public", "custom_images");

  // Ensure directories exist
  const assetsDir = path.join(process.cwd(), "src", "assets");
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }

  // Helper to save Base64 image to public directory and return file path
  const saveImageToFile = (key: string, value: string): string => {
    if (typeof value === "string" && value.startsWith("data:image/")) {
      const match = value.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (match) {
        let ext = match[1].toLowerCase();
        if (ext === "jpeg") ext = "jpg";
        const cleanKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
        const filename = `${cleanKey}.${ext}`;
        const filePath = path.join(publicImagesDir, filename);
        fs.writeFileSync(filePath, Buffer.from(match[2], "base64"));
        return `/custom_images/${filename}?t=${Date.now()}`;
      }
    }
    return value;
  };

  // Get custom images
  app.get("/api/custom-images", (req, res) => {
    try {
      if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, "utf8");
        return res.json(JSON.parse(data));
      }
    } catch (err) {
      console.error("Error reading custom images:", err);
    }
    return res.json({});
  });

  // Save/update custom image
  app.post("/api/custom-images", (req, res) => {
    try {
      const { key, base64 } = req.body;
      if (!key) {
        return res.status(400).json({ error: "Missing key" });
      }

      let currentData: Record<string, string> = {};
      if (fs.existsSync(dataFilePath)) {
        try {
          const fileContent = fs.readFileSync(dataFilePath, "utf8");
          currentData = JSON.parse(fileContent);
        } catch (e) {
          currentData = {};
        }
      }

      if (base64) {
        currentData[key] = saveImageToFile(key, base64);
      } else {
        delete currentData[key];
      }

      const tempPath = dataFilePath + ".tmp";
      fs.writeFileSync(tempPath, JSON.stringify(currentData, null, 2), "utf8");
      fs.renameSync(tempPath, dataFilePath);
      return res.json({ success: true, count: Object.keys(currentData).length, url: currentData[key] });
    } catch (err) {
      console.error("Error saving custom image:", err);
      return res.status(500).json({ error: "Failed to save image" });
    }
  });

  // Bulk save/sync custom images (useful on first load to sync localStorage)
  app.post("/api/custom-images/sync", (req, res) => {
    try {
      const { images } = req.body;
      if (!images || typeof images !== "object") {
        return res.status(400).json({ error: "Invalid images object" });
      }

      let currentData: Record<string, string> = {};
      if (fs.existsSync(dataFilePath)) {
        try {
          const fileContent = fs.readFileSync(dataFilePath, "utf8");
          currentData = JSON.parse(fileContent);
        } catch (e) {
          currentData = {};
        }
      }

      // Process and save incoming images as files
      const processed: Record<string, string> = {};
      for (const [k, v] of Object.entries(images)) {
        if (typeof v === "string") {
          processed[k] = saveImageToFile(k, v);
        }
      }

      // Merge incoming images with current ones
      const merged = { ...currentData, ...processed };
      const tempPath = dataFilePath + ".tmp";
      fs.writeFileSync(tempPath, JSON.stringify(merged, null, 2), "utf8");
      fs.renameSync(tempPath, dataFilePath);
      return res.json({ success: true, count: Object.keys(merged).length });
    } catch (err) {
      console.error("Error syncing custom images:", err);
      return res.status(500).json({ error: "Failed to sync images" });
    }
  });

  // Reset custom images
  app.post("/api/custom-images/reset", (req, res) => {
    try {
      if (fs.existsSync(dataFilePath)) {
        fs.unlinkSync(dataFilePath);
      }
      return res.json({ success: true });
    } catch (err) {
      console.error("Error resetting custom images:", err);
      return res.status(500).json({ error: "Failed to reset" });
    }
  });

  // Explicit static route for custom images with long-term caching
  app.use("/custom_images", express.static(publicImagesDir, {
    maxAge: "1d",
    setHeaders: (res, path) => {
      if (path.endsWith(".jpg") || path.endsWith(".jpeg")) {
        res.setHeader("Content-Type", "image/jpeg");
      } else if (path.endsWith(".png")) {
        res.setHeader("Content-Type", "image/png");
      }
    }
  }));

  // Clean 404 for missing static images so browser does not receive index.html
  app.use("/custom_images", (req, res) => {
    res.status(404).json({ error: "Image not found" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
