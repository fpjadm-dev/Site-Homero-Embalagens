# Instruções de Persistência do Projeto Homero Embalagens

## Preservação de Imagens Reais
- **Regra Fundamental**: Todas as imagens e fotos reais alteradas ou customizadas pelo usuário (gerenciadas via `customImages`, `src/assets/custom_images_data.json` e `localStorage`) devem ser **rigorosamente mantidas e preservadas**.
- **Nunca substituir** fotos reais da marca/produtos por imagens geradas automaticamente por IA.
- Todas as renderizações visuais no site, modal de catálogo e PDF de impressão devem sempre priorizar `customImages[key] || item.image`.
