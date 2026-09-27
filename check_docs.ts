import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json" with { type: "json" };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function inspectDocs() {
  const ids = ["sacos-padaria", "sacos-padaria-visor", "sacos-sacolas-delivery", "acoplados-embrulho", "differentials", "hero"];
  for (const id of ids) {
    const snap = await getDoc(doc(db, "custom_images", id));
    console.log(`${id}: exists=${snap.exists()}`, snap.data());
  }
}

inspectDocs().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
