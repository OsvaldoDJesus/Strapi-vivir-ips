// Cliente para conectar con Strapi Cloud
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || import.meta.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = import.meta.env.PUBLIC_STRAPI_TOKEN || import.meta.env.STRAPI_TOKEN

interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiSingleResponse<T> {
  data: T
  meta: {}
}

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` })
    },
    // Cache optimizado: fuerza cache para mejor rendimiento
    cache: 'force-cache'
  }

  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    ...defaultOptions,
    ...options
  })

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} - ${response.statusText}`)
  }

  return response.json()
}

// Funciones específicas para tu proyecto

// ===== SEDES =====
export async function fetchSedes() {
  try {
    return await fetchAPI('sedes?populate=*&sort=name:asc')
  } catch (error) {
    console.error('Error fetching sedes:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }
  }
}

// ===== PROGRAMAS =====
export async function fetchProgramas() {
  try {
    return await fetchAPI('programas?populate=*&sort=order:asc')
  } catch (error) {
    console.error('Error fetching programas:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }
  }
}

// ===== ALIADOS =====
export async function fetchAliados() {
  try {
    return await fetchAPI('aliados?populate=*&sort=order:asc')
  } catch (error) {
    console.error('Error fetching aliados:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }
  }
}

// ===== BLOGS =====
export async function fetchBlogs(filters?: { 
  featured?: boolean; 
  categoria?: string; 
  limit?: number;
  page?: number;
  pageSize?: number;
}) {
  try {
    // Populate profundo nivel 2 - esto trae autor.avatar
    let query = 'blogs?populate[0]=imgPortadaBlog&populate[1]=blog&populate[2]=autor.avatar&sort=FechaDePublicacion:desc'
    
    if (filters?.featured) {
      query += '&filters[blogDestacado][$eq]=true'
    }
    if (filters?.categoria) {
      query += `&filters[blog][slugCategoria][$eq]=${filters.categoria}`
    }
    
    // Paginación de Strapi (más eficiente que limit)
    if (filters?.page && filters?.pageSize) {
      query += `&pagination[page]=${filters.page}&pagination[pageSize]=${filters.pageSize}`
    } else if (filters?.limit) {
      query += `&pagination[limit]=${filters.limit}`
    }
    
    return await fetchAPI(query)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }
  }
}

export async function fetchBlogBySlug(slug: string) {
  try {
    const response = await fetchAPI(`blogs?filters[slugBlogs][$eq]=${slug}&populate[0]=imgPortadaBlog&populate[1]=blog&populate[2]=autor.avatar`)
    return response.data[0] || null
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

// Mantener fetchArticulos como alias para compatibilidad
export const fetchArticulos = fetchBlogs
export const fetchArticuloBySlug = fetchBlogBySlug

// ===== AUTORES =====
export async function fetchAutores(filters?: { active?: boolean }) {
  try {
    let query = 'autors?populate[avatar]=*&sort=nombreAutor:asc'
    
    if (filters?.active !== undefined) {
      query += `&filters[autorActivo][$eq]=${filters.active}`
    }
    
    return await fetchAPI(query)
  } catch (error) {
    console.error('Error fetching autores:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }
  }
}

// ===== CATEGORÍAS =====
export async function fetchCategorias() {
  try {
    return await fetchAPI('categorias?sort=NombreCategoria:asc')
  } catch (error) {
    console.error('Error fetching categorias:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }
  }
}
 
// ===== NOTICIAS =====
export async function fetchNoticias(filters?: { type?: string; active?: boolean; limit?: number }) {
  try {
    let query = 'noticias?populate=multimediaNoticia&sort[0]=prioridad:desc&sort[1]=fechaDeInicioNoticia:desc'
    
    // Filtrar solo activas por defecto
    if (filters?.active !== false) {
      query += '&filters[estaActiva][$eq]=true'
    }
    
    if (filters?.type) {
      query += `&filters[tipoDeContenidoNoticia][$eq]=${filters.type}`
    }
    
    if (filters?.limit) {
      query += `&pagination[limit]=${filters.limit}`
    }
    
    return await fetchAPI(query)
  } catch (error) {
    console.error('Error fetching noticias:', error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } } }
  }
}

export async function fetchNoticiaBySlug(slug: string) {
  try {
    const response = await fetchAPI(`noticias?filters[slugNoticia][$eq]=${slug}&populate=multimediaNoticia`)
    return response.data[0] || null
  } catch (error) {
    console.error('Error fetching noticia:', error)
    return null
  }
}

// Helper para obtener URL de imagen de Strapi
export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

// Helper para obtener imagen optimizada según el contexto
export function getStrapiOptimizedImage(image: any, size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'): string {
  if (!image) return '/placeholder.jpg'
  
  // Si tiene formatos optimizados, usar el tamaño solicitado
  if (image.formats && image.formats[size]) {
    const url = getStrapiMedia(image.formats[size].url)
    // Agregar formato WebP si Strapi lo soporta (ahorra ~50% peso)
    return url.includes('?') ? `${url}&format=webp` : `${url}?format=webp`
  }
  
  // Fallback a la imagen original si no hay formato optimizado
  if (image.url) {
    const url = getStrapiMedia(image.url)
    return url.includes('?') ? `${url}&format=webp` : `${url}?format=webp`
  }
  
  return '/placeholder.jpg'
}
