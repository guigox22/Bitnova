// Configuração da API de celulares
const API_BASE_URL = "https://azharimm-phone-specs.p.rapidapi.com";
const API_KEY = "RAPIDAPI_KEY"; // Em produção, isso seria substituído por uma chave real

// Banco de dados local de celulares (para fallback caso a API falhe)
const phoneDatabase = {
    // Alguns modelos populares para fallback
    iphone15: {
        name: "iPhone 15 Pro Max",
        image: "https://via.placeholder.com/200x400/0099ff/ffffff?text=iPhone+15",
        processor: "Apple A17 Pro",
        ram: "8 GB",
        storage: "256 GB / 512 GB / 1 TB",
        display: "6,7 polegadas OLED Super Retina XDR, 120Hz",
        rearCamera: "48 MP (principal) + 12 MP (ultra-wide) + 12 MP (teleobjetiva)",
        frontCamera: "12 MP TrueDepth",
        battery: "4.422 mAh, carregamento rápido 27W",
        os: "iOS 17",
        price: "R$ 9.899"
    },
    s23ultra: {
        name: "Samsung Galaxy S23 Ultra",
        image: "https://via.placeholder.com/200x400/00cc66/ffffff?text=Galaxy+S23",
        processor: "Snapdragon 8 Gen 2",
        ram: "12 GB",
        storage: "256 GB / 512 GB / 1 TB",
        display: "6,8 polegadas Dynamic AMOLED 2X, 120Hz",
        rearCamera: "200 MP (principal) + 12 MP (ultra-wide) + 10 MP (teleobjetiva 3x) + 10 MP (teleobjetiva 10x)",
        frontCamera: "12 MP",
        battery: "5.000 mAh, carregamento rápido 45W",
        os: "Android 13, One UI 5.1",
        price: "R$ 7.499"
    }
};

// Função para carregar os modelos de celulares na interface
document.addEventListener('DOMContentLoaded', function() {
    // Carregar as marcas de celulares da API
    loadBrands();
    
    // Configurar o botão de comparação
    const compareBtn = document.getElementById('compare-btn');
    compareBtn.addEventListener('click', function() {
        const phone1Select = document.getElementById('phone1');
        const phone2Select = document.getElementById('phone2');
        
        const phone1Id = phone1Select.value;
        const phone2Id = phone2Select.value;
        
        if (phone1Id && phone2Id) {
            comparePhones(phone1Id, phone2Id);
        } else {
            alert('Por favor, selecione dois celulares para comparar.');
        }
    });
    
    // Adicionar funcionalidade aos filtros
    const filterBtn = document.querySelector('.filter-btn');
    filterBtn.addEventListener('click', function() {
        const brandFilter = document.getElementById('brand-filter').value;
        const priceFilter = document.getElementById('price-filter').value;
        
        if (brandFilter !== 'all') {
            loadModelsByBrand(brandFilter);
        } else {
            loadAllModels();
        }
    });
});

// Função para carregar as marcas de celulares da API
async function loadBrands() {
    try {
        const response = await fetchFromAPI('/brands');
        
        if (response && response.data && response.data.length > 0) {
            updateBrandFilter(response.data);
            loadAllModels();
        } else {
            // Fallback para dados locais
            console.warn('Não foi possível carregar marcas da API, usando dados locais');
            populateSelectsWithLocalData();
        }
    } catch (error) {
        console.error('Erro ao carregar marcas:', error);
        populateSelectsWithLocalData();
    }
}

// Função para atualizar o filtro de marcas
function updateBrandFilter(brands) {
    const brandFilter = document.getElementById('brand-filter');
    
    // Limpar opções existentes
    brandFilter.innerHTML = '<option value="all">Todas</option>';
    
    // Adicionar marcas da API
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand.brand_slug;
        option.textContent = brand.brand_name;
        brandFilter.appendChild(option);
    });
}

// Função para carregar todos os modelos de celulares
async function loadAllModels() {
    try {
        const response = await fetchFromAPI('/phones');
        
        if (response && response.data && response.data.phones) {
            populateSelectsWithAPIData(response.data.phones);
        } else {
            // Fallback para dados locais
            console.warn('Não foi possível carregar modelos da API, usando dados locais');
            populateSelectsWithLocalData();
        }
    } catch (error) {
        console.error('Erro ao carregar modelos:', error);
        populateSelectsWithLocalData();
    }
}

// Função para carregar modelos por marca
async function loadModelsByBrand(brandSlug) {
    try {
        const response = await fetchFromAPI(`/brands/${brandSlug}`);
        
        if (response && response.data && response.data.phones) {
            populateSelectsWithAPIData(response.data.phones);
        } else {
            // Fallback para dados locais
            console.warn('Não foi possível carregar modelos da marca da API, usando dados locais');
            populateSelectsWithLocalData();
        }
    } catch (error) {
        console.error('Erro ao carregar modelos da marca:', error);
        populateSelectsWithLocalData();
    }
}

// Função para fazer requisições à API
async function fetchFromAPI(endpoint) {
    try {
        // Em um ambiente real, isso seria uma chamada real à API
        // const url = `${API_BASE_URL}${endpoint}`;
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': API_KEY,
        //         'X-RapidAPI-Host': 'azharimm-phone-specs.p.rapidapi.com'
        //     }
        // };
        // const response = await fetch(url, options);
        // return await response.json();
        
        // Simulação de resposta da API para demonstração
        if (endpoint === '/brands') {
            return {
                status: true,
                data: [
                    { brand_id: 1, brand_name: 'Apple', brand_slug: 'apple' },
                    { brand_id: 2, brand_name: 'Samsung', brand_slug: 'samsung' },
                    { brand_id: 3, brand_name: 'Google', brand_slug: 'google' },
                    { brand_id: 4, brand_name: 'Xiaomi', brand_slug: 'xiaomi' },
                    { brand_id: 5, brand_name: 'Motorola', brand_slug: 'motorola' },
                    { brand_id: 6, brand_name: 'OnePlus', brand_slug: 'oneplus' },
                    { brand_id: 7, brand_name: 'ASUS', brand_slug: 'asus' },
                    { brand_id: 8, brand_name: 'Realme', brand_slug: 'realme' },
                    { brand_id: 9, brand_name: 'OPPO', brand_slug: 'oppo' },
                    { brand_id: 10, brand_name: 'Vivo', brand_slug: 'vivo' },
                    { brand_id: 11, brand_name: 'Nothing', brand_slug: 'nothing' }
                ]
            };
        } else if (endpoint === '/phones') {
            return {
                status: true,
                data: {
                    phones: [
                        { phone_id: 1, phone_name: 'iPhone 15 Pro Max', slug: 'iphone15', image: 'https://via.placeholder.com/200x400/0099ff/ffffff?text=iPhone+15' },
                        { phone_id: 2, phone_name: 'Samsung Galaxy S23 Ultra', slug: 's23ultra', image: 'https://via.placeholder.com/200x400/00cc66/ffffff?text=Galaxy+S23' },
                        { phone_id: 3, phone_name: 'Google Pixel 8 Pro', slug: 'pixel8', image: 'https://via.placeholder.com/200x400/ff6600/ffffff?text=Pixel+8+Pro' },
                        { phone_id: 4, phone_name: 'Xiaomi 13 Pro', slug: 'mi13', image: 'https://via.placeholder.com/200x400/cc33ff/ffffff?text=Xiaomi+13+Pro' },
                        { phone_id: 5, phone_name: 'iPhone 16 Pro Max', slug: 'iphone16', image: 'https://via.placeholder.com/200x400/0066cc/ffffff?text=iPhone+16' },
                        { phone_id: 6, phone_name: 'Samsung Galaxy S24 Ultra', slug: 's24ultra', image: 'https://via.placeholder.com/200x400/009933/ffffff?text=Galaxy+S24' },
                        { phone_id: 7, phone_name: 'Google Pixel 10 Pro', slug: 'pixel10', image: 'https://via.placeholder.com/200x400/ff9900/ffffff?text=Pixel+10+Pro' },
                        { phone_id: 8, phone_name: 'Xiaomi 14 Ultra', slug: 'xiaomi14', image: 'https://via.placeholder.com/200x400/9900cc/ffffff?text=Xiaomi+14' },
                        { phone_id: 9, phone_name: 'Nothing Phone (2)', slug: 'nothing2', image: 'https://via.placeholder.com/200x400/cccccc/333333?text=Nothing+2' },
                        { phone_id: 10, phone_name: 'OnePlus 12', slug: 'oneplus', image: 'https://via.placeholder.com/200x400/cc0000/ffffff?text=OnePlus+12' }
                    ]
                }
            };
        } else if (endpoint.startsWith('/brands/')) {
            const brand = endpoint.split('/')[2];
            let phones = [];
            
            if (brand === 'apple') {
                phones = [
                    { phone_id: 1, phone_name: 'iPhone 15 Pro Max', slug: 'iphone15', image: 'https://via.placeholder.com/200x400/0099ff/ffffff?text=iPhone+15' },
                    { phone_id: 5, phone_name: 'iPhone 16 Pro Max', slug: 'iphone16', image: 'https://via.placeholder.com/200x400/0066cc/ffffff?text=iPhone+16' },
                    { phone_id: 11, phone_name: 'iPhone 15', slug: 'iphone15base', image: 'https://via.placeholder.com/200x400/3399ff/ffffff?text=iPhone+15' },
                    { phone_id: 12, phone_name: 'iPhone 14 Pro', slug: 'iphone14pro', image: 'https://via.placeholder.com/200x400/6699ff/ffffff?text=iPhone+14+Pro' }
                ];
            } else if (brand === 'samsung') {
                phones = [
                    { phone_id: 2, phone_name: 'Samsung Galaxy S23 Ultra', slug: 's23ultra', image: 'https://via.placeholder.com/200x400/00cc66/ffffff?text=Galaxy+S23' },
                    { phone_id: 6, phone_name: 'Samsung Galaxy S24 Ultra', slug: 's24ultra', image: 'https://via.placeholder.com/200x400/009933/ffffff?text=Galaxy+S24' },
                    { phone_id: 13, phone_name: 'Samsung Galaxy A56', slug: 'galaxya56', image: 'https://via.placeholder.com/200x400/3399ff/ffffff?text=Galaxy+A56' },
                    { phone_id: 14, phone_name: 'Samsung Galaxy A16', slug: 'galaxya16', image: 'https://via.placeholder.com/200x400/66ccff/333333?text=Galaxy+A16' }
                ];
            } else {
                phones = [
                    { phone_id: 3, phone_name: 'Google Pixel 8 Pro', slug: 'pixel8', image: 'https://via.placeholder.com/200x400/ff6600/ffffff?text=Pixel+8+Pro' },
                    { phone_id: 4, phone_name: 'Xiaomi 13 Pro', slug: 'mi13', image: 'https://via.placeholder.com/200x400/cc33ff/ffffff?text=Xiaomi+13+Pro' }
                ];
            }
            
            return {
                status: true,
                data: {
                    phones: phones
                }
            };
        } else if (endpoint.startsWith('/phone/')) {
            const slug = endpoint.split('/')[2];
            
            // Simulação de dados detalhados de um celular
            return {
                status: true,
                data: {
                    brand: slug.includes('iphone') ? 'Apple' : slug.includes('galaxy') ? 'Samsung' : 'Outro',
                    phone_name: slug.includes('iphone') ? 'iPhone 15 Pro Max' : slug.includes('galaxy') ? 'Samsung Galaxy S23 Ultra' : 'Smartphone',
                    thumbnail: `https://via.placeholder.com/200x400/0099ff/ffffff?text=${slug}`,
                    phone_images: [`https://via.placeholder.com/200x400/0099ff/ffffff?text=${slug}`],
                    release_date: '2025-06-10',
                    dimension: '160.7 x 77.6 x 8.25 mm',
                    os: slug.includes('iphone') ? 'iOS 17' : 'Android 14',
                    storage: '256 GB, 512 GB, 1 TB',
                    specifications: [
                        {
                            title: 'Processador',
                            specs: [{ key: 'Chipset', val: slug.includes('iphone') ? 'Apple A17 Pro' : 'Snapdragon 8 Gen 3' }]
                        },
                        {
                            title: 'Memória',
                            specs: [{ key: 'RAM', val: slug.includes('iphone') ? '8 GB' : '12 GB' }]
                        },
                        {
                            title: 'Tela',
                            specs: [
                                { key: 'Tamanho', val: slug.includes('iphone') ? '6.7 polegadas' : '6.8 polegadas' },
                                { key: 'Resolução', val: slug.includes('iphone') ? '2796 x 1290 pixels' : '3088 x 1440 pixels' },
                                { key: 'Tecnologia', val: slug.includes('iphone') ? 'Super Retina XDR OLED' : 'Dynamic AMOLED 2X' },
                                { key: 'Taxa de atualização', val: '120 Hz' }
                            ]
                        },
                        {
                            title: 'Câmera',
                            specs: [
                                { key: 'Principal', val: slug.includes('iphone') ? '48 MP' : '200 MP' },
                                { key: 'Ultra-wide', val: slug.includes('iphone') ? '12 MP' : '12 MP' },
                                { key: 'Teleobjetiva', val: slug.includes('iphone') ? '12 MP' : '10 MP' },
                                { key: 'Frontal', val: slug.includes('iphone') ? '12 MP' : '12 MP' }
                            ]
                        },
                        {
                            title: 'Bateria',
                            specs: [
                                { key: 'Capacidade', val: slug.includes('iphone') ? '4422 mAh' : '5000 mAh' },
                                { key: 'Carregamento', val: slug.includes('iphone') ? '27W' : '45W' }
                            ]
                        }
                    ]
                }
            };
        }
        
        return null;
    } catch (error) {
        console.error('Erro na requisição à API:', error);
        return null;
    }
}

// Função para popular os selects com dados da API
function populateSelectsWithAPIData(phones) {
    const phone1Select = document.getElementById('phone1');
    const phone2Select = document.getElementById('phone2');
    
    // Limpar os selects
    phone1Select.innerHTML = '<option value="">Selecione um modelo</option>';
    phone2Select.innerHTML = '<option value="">Selecione um modelo</option>';
    
    // Adicionar os modelos
    phones.forEach(phone => {
        const option1 = document.createElement('option');
        option1.value = phone.slug;
        option1.textContent = phone.phone_name;
        phone1Select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = phone.slug;
        option2.textContent = phone.phone_name;
        phone2Select.appendChild(option2);
    });
}

// Função para popular os selects com dados locais (fallback)
function populateSelectsWithLocalData() {
    const phone1Select = document.getElementById('phone1');
    const phone2Select = document.getElementById('phone2');
    
    // Limpar os selects
    phone1Select.innerHTML = '<option value="">Selecione um modelo</option>';
    phone2Select.innerHTML = '<option value="">Selecione um modelo</option>';
    
    // Adicionar os modelos do banco de dados local
    for (const [id, phone] of Object.entries(phoneDatabase)) {
        const option1 = document.createElement('option');
        option1.value = id;
        option1.textContent = phone.name;
        phone1Select.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = id;
        option2.textContent = phone.name;
        phone2Select.appendChild(option2);
    }
}

// Função para comparar dois celulares
async function comparePhones(phone1Id, phone2Id) {
    try {
        // Buscar dados detalhados dos celulares na API
        const phone1Data = await fetchPhoneDetails(phone1Id);
        const phone2Data = await fetchPhoneDetails(phone2Id);
        
        // Atualizar a interface com os dados obtidos
        updateComparisonUI(phone1Data, phone2Data);
    } catch (error) {
        console.error('Erro ao comparar celulares:', error);
        
        // Fallback para dados locais em caso de erro
        if (phoneDatabase[phone1Id] && phoneDatabase[phone2Id]) {
            updateComparisonWithLocalData(phone1Id, phone2Id);
        } else {
            alert('Não foi possível obter os dados dos celulares selecionados.');
        }
    }
}

// Função para buscar detalhes de um celular na API
async function fetchPhoneDetails(phoneId) {
    try {
        const response = await fetchFromAPI(`/phone/${phoneId}`);
        
        if (response && response.status && response.data) {
            return formatPhoneData(response.data);
        } else {
            // Fallback para dados locais
            if (phoneDatabase[phoneId]) {
                return phoneDatabase[phoneId];
            }
            throw new Error('Dados do celular não encontrados');
        }
    } catch (error) {
        console.error(`Erro ao buscar detalhes do celular ${phoneId}:`, error);
        
        // Fallback para dados locais
        if (phoneDatabase[phoneId]) {
            return phoneDatabase[phoneId];
        }
        throw error;
    }
}

// Função para formatar os dados do celular obtidos da API
function formatPhoneData(apiData) {
    // Extrair e formatar os dados relevantes da resposta da API
    const getSpecValue = (title, key) => {
        const specGroup = apiData.specifications.find(spec => spec.title === title);
        if (specGroup) {
            const spec = specGroup.specs.find(s => s.key === key);
            return spec ? spec.val : '-';
        }
        return '-';
    };
    
    return {
        name: apiData.phone_name,
        image: apiData.thumbnail || apiData.phone_images[0],
        processor: getSpecValue('Processador', 'Chipset'),
        ram: getSpecValue('Memória', 'RAM'),
        storage: apiData.storage || getSpecValue('Memória', 'Armazenamento'),
        display: `${getSpecValue('Tela', 'Tamanho')}, ${getSpecValue('Tela', 'Tecnologia')}, ${getSpecValue('Tela', 'Taxa de atualização')}`,
        rearCamera: `${getSpecValue('Câmera', 'Principal')} (principal) + ${getSpecValue('Câmera', 'Ultra-wide')} (ultra-wide) + ${getSpecValue('Câmera', 'Teleobjetiva')} (teleobjetiva)`,
        frontCamera: getSpecValue('Câmera', 'Frontal'),
        battery: `${getSpecValue('Bateria', 'Capacidade')}, carregamento rápido ${getSpecValue('Bateria', 'Carregamento')}`,
        os: apiData.os,
        price: 'Consultar'  // A API não fornece preços
    };
}

// Função para atualizar a interface com os dados dos celulares
function updateComparisonUI(phone1, phone2) {
    // Atualizar nomes
    document.getElementById('phone1-name').textContent = phone1.name;
    document.getElementById('phone2-name').textContent = phone2.name;
    
    // Atualizar imagens
    document.getElementById('phone1-image').innerHTML = `<img src="${phone1.image}" alt="${phone1.name}">`;
    document.getElementById('phone2-image').innerHTML = `<img src="${phone2.image}" alt="${phone2.name}">`;
    
    // Atualizar especificações
    document.getElementById('phone1-processor').textContent = phone1.processor;
    document.getElementById('phone2-processor').textContent = phone2.processor;
    
    document.getElementById('phone1-ram').textContent = phone1.ram;
    document.getElementById('phone2-ram').textContent = phone2.ram;
    
    document.getElementById('phone1-storage').textContent = phone1.storage;
    document.getElementById('phone2-storage').textContent = phone2.storage;
    
    document.getElementById('phone1-display').textContent = phone1.display;
    document.getElementById('phone2-display').textContent = phone2.display;
    
    document.getElementById('phone1-rear-camera').textContent = phone1.rearCamera;
    document.getElementById('phone2-rear-camera').textContent = phone2.rearCamera;
    
    document.getElementById('phone1-front-camera').textContent = phone1.frontCamera;
    document.getElementById('phone2-front-camera').textContent = phone2.frontCamera;
    
    document.getElementById('phone1-battery').textContent = phone1.battery;
    document.getElementById('phone2-battery').textContent = phone2.battery;
    
    document.getElementById('phone1-os').textContent = phone1.os;
    document.getElementById('phone2-os').textContent = phone2.os;
    
    document.getElementById('phone1-price').textContent = phone1.price;
    document.getElementById('phone2-price').textContent = phone2.price;
    
    // Destacar diferenças
    highlightDifferences();
    
    // Rolar para o resultado da comparação
    document.getElementById('comparison-result').scrollIntoView({ behavior: 'smooth' });
}

// Função para atualizar a comparação com dados locais (fallback)
function updateComparisonWithLocalData(phone1Id, phone2Id) {
    const phone1 = phoneDatabase[phone1Id];
    const phone2 = phoneDatabase[phone2Id];
    
    updateComparisonUI(phone1, phone2);
}

// Função para destacar diferenças entre os celulares
function highlightDifferences() {
    const rows = document.querySelectorAll('.comparison-row:not(.header-row)');
    
    rows.forEach(row => {
        const values = row.querySelectorAll('.spec-value');
        if (values[0].textContent !== values[1].textContent) {
            values.forEach(value => {
                value.style.fontWeight = 'bold';
                value.style.color = '#3498db';
            });
        } else {
            values.forEach(value => {
                value.style.fontWeight = 'normal';
                value.style.color = '#333';
            });
        }
    });
}
