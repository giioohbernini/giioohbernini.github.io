# Blog do Giovanni Bernini

Este repositório contém os arquivos estáticos que alimentam o blog [giovannibernini.com.br](https://giovannibernini.com.br/).

## Arquitetura

O site é completamente estático e organizado da seguinte forma:

- `index.html` é a página inicial.
- `css/`, `js/` e `img/` armazenam estilos, scripts e imagens.
- Cada post possui uma pasta própria com um `index.html`.
- Páginas de categorias, tags e arquivos ficam em `categorias/`, `tags/` e `archives/`.
- Arquivos de SEO como `sitemap.xml` e `atom.xml` estão na raiz.

## Como contribuir

1. Faça um fork deste repositório e crie uma branch para sua alteração.
2. Realize suas modificações seguindo o estilo do projeto.
3. Execute os testes descritos abaixo para garantir que tudo funciona.
4. Abra um Pull Request descrevendo suas mudanças.

## Como testar

1. Sirva o site localmente para verificar se as páginas carregam corretamente:

   ```bash
   python -m http.server 8000
   ```

2. Acesse `http://localhost:8000` no navegador ou utilize `curl -I http://localhost:8000` para verificar a resposta.

## Como fazer deploy

O site é publicado via GitHub Pages. Ao enviar suas alterações para a branch `main`, o deploy é realizado automaticamente.

```bash
git push origin main
```

Certifique-se de que todos os arquivos necessários foram comitados antes de realizar o push.

