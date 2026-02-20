import GithubCRUD from './index.js';
import './github-crud.css';

const gc = new GithubCRUD({
  clientId: import.meta.env.VITE_GH_CLIENT_ID,
  workerUrl: import.meta.env.VITE_WORKER_URL,
  repoOwner: import.meta.env.VITE_REPO_OWNER,
  repoName: import.meta.env.VITE_REPO_NAME,
  roles: ['admin', 'editor'],
});

const PRODUK = {
  id: 'produk', label: 'Produk', file: 'data/produk.json',
  roles: { admin: 'all', editor: 'write' },
  schema: [
    { key: 'id', label: 'ID', type: 'number', auto: true, readonly: true },
    { key: 'nama', label: 'Nama', type: 'text', required: true },
    { key: 'harga', label: 'Harga', type: 'number', min: 0 },
  ],
};

const session = await gc.init();
if (!session) {
  gc.renderLoginCard('#app');
} else {
  gc.mountTable(PRODUK, '#app');
}