# z-one — site institucional

Landing page estática da **z-one** (serviços de TI e automação com IA), publicada via GitHub Pages.

**URL prevista:** [https://zee-dash-one.github.io/z-one-page/](https://zee-dash-one.github.io/z-one-page/)

## Conteúdo

- Hero com logotipo e posicionamento
- Projetos (z-team, Devotio, Neon Maze, Cubu Dash, Ikarus Eternal Horizon — repositórios em [zee-dash-one](https://github.com/zee-dash-one); Bellspretty e Homeschooling em breve)
- Atuação (produtos e automação com IA, z-team / MCP)
- Instagram [@zeedashone](https://www.instagram.com/zeedashone/)

Arquivos estáticos: `index.html`, `css/`, `js/`, `public/assets/` (`z-one-oficial-regua.png` no hero; `z-one-oficial-original.png` para favicon e compartilhamento).

## Rodar localmente

Não há build obrigatório. Sirva a raiz do repositório com qualquer servidor estático:

```bash
# Python 3
python3 -m http.server 8080

# ou Node (npx)
npx --yes serve -l 8080
```

Abra [http://localhost:8080](http://localhost:8080) (ou a porta escolhida).

## GitHub Pages

### Deploy automático (recomendado)

O workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publica o site na branch `main` usando **GitHub Actions** e o artefato na raiz do repositório.

**Ativação única no GitHub (se ainda não estiver ativo):**

1. Repositório **Settings** → **Pages**
2. Em **Build and deployment**, selecione **Source: GitHub Actions**
3. Após o primeiro push em `main` com o workflow, o deploy deve aparecer em **Actions** e o site ficará disponível em `https://hilderney.github.io/z-one-page/`

O arquivo [`.nojekyll`](.nojekyll) evita processamento Jekyll e garante que pastas como `css/` e `js/` sejam servidas corretamente.

### Estrutura

| Caminho | Função |
|--------|--------|
| `index.html` | Página principal (pt-BR) |
| `css/styles.css` | Estilos (paleta near-black, off-white, acento vermelho) |
| `js/main.js` | Menu mobile e ano no rodapé |
| `public/assets/` | Logotipo e ícone |

## Licença e marca

Logotipo e identidade visual são da z-one / Hil Zapf (Hilderney). Não reutilizar sem autorização.
