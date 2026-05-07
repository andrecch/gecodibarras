const EAN13 = {
  L: ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
  G: ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'],
  R: ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'],
  START: '101',
  CENTER: '01010',
  END: '101',

  calculateChecksum(code) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3);
    }
    return (10 - (sum % 10)) % 10;
  },

  validate(code) {
    if (!/^\d{13}$/.test(code)) return false;
    const expectedChecksum = this.calculateChecksum(code.substring(0, 12));
    return parseInt(code[12]) === expectedChecksum;
  },

  draw(canvas, code) {
    if (!this.validate(code)) return false;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / 95;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';

    let binary = '';
    binary += this.START;

    const firstDigit = parseInt(code[0]);
    const leftDigits = code.substring(1, 7);
    const rightDigits = code.substring(7, 13);

    const parityPattern = [
      'LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG',
      'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'
    ];
    const pattern = parityPattern[firstDigit];

    for (let i = 0; i < 6; i++) {
      const digit = parseInt(leftDigits[i]);
      binary += pattern[i] === 'L' ? this.L[digit] : this.G[digit];
    }

    binary += this.CENTER;

    for (let i = 0; i < 6; i++) {
      const digit = parseInt(rightDigits[i]);
      binary += this.R[digit];
    }

    binary += this.END;

    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === '1') {
        const x = i * barWidth;
        const barHeight = i < binary.indexOf(this.CENTER) || i >= binary.indexOf(this.CENTER) + this.CENTER.length + 6 ? height : height * 0.95;
        ctx.fillRect(x, (height - barHeight) / 2, barWidth, barHeight);
      }
    }

    return true;
  }
};

const API = {
  async getProductos() {
    const res = await fetch('/productos');
    return res.json();
  }
};

class RegistrosApp {
  constructor() {
    this.productos = [];
    this.recordsGrid = document.getElementById('recordsGrid');
    this.noResults = document.getElementById('noResults');
    this.searchInput = document.getElementById('searchInput');

    this.setupEventListeners();
    this.loadProductos();
  }

  setupEventListeners() {
    let searchTimeout;
    this.searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => this.filterProductos(), 300);
    });
  }

  async loadProductos() {
    try {
      const res = await API.getProductos();
      if (res.success) {
        this.productos = res.data;
        this.renderProductos();
      }
    } catch (err) {
      console.error('Error loading productos:', err);
    }
  }

  renderProductos(productos = this.productos) {
    this.recordsGrid.innerHTML = '';

    if (productos.length === 0) {
      this.noResults.style.display = 'block';
      return;
    }

    this.noResults.style.display = 'none';

    productos.forEach(producto => {
      const card = this.createProductCard(producto);
      this.recordsGrid.appendChild(card);
    });
  }

  createProductCard(producto) {
    const card = document.createElement('div');
    card.className = 'product-card glass';

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 60;
    EAN13.draw(canvas, producto.codigo);

    const fecha = new Date(producto.fecha);
    const fechaFormateada = fecha.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    card.innerHTML = `
      <div class="product-barcode"></div>
      <div class="product-info">
        <div class="product-code-row">
          <span class="product-code">${producto.codigo}</span>
          <button class="btn-copy" data-code="${producto.codigo}" title="Copiar codigo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
          </button>
        </div>
        <span class="product-description">${producto.descripcion}</span>
        <span class="product-date">${fechaFormateada}</span>
      </div>
    `;

    card.querySelector('.product-barcode').appendChild(canvas);

    card.querySelector('.btn-copy').addEventListener('click', (e) => {
      e.stopPropagation();
      this.copyToClipboard(producto.codigo);
    });

    return card;
  }

  copyToClipboard(code) {
    navigator.clipboard.writeText(code).then(() => {
      this.showToast('Codigo copiado al portapapeles');
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.showToast('Codigo copiado al portapapeles');
    });
  }

  showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('active');
    });

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  filterProductos() {
    const query = this.searchInput.value.toLowerCase().trim();
    if (!query) {
      this.renderProductos();
      return;
    }

    const filtered = this.productos.filter(p =>
      p.descripcion.toLowerCase().includes(query) ||
      p.codigo.includes(query)
    );
    this.renderProductos(filtered);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RegistrosApp();
});