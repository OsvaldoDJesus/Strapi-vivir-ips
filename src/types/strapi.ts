// Tipos TypeScript para Strapi Content Types

export interface StrapiImage {
  data: {
    id: number
    attributes: {
      name: string
      alternativeText: string | null
      caption: string | null
      width: number
      height: number
      formats: any
      url: string
      previewUrl: string | null
      provider: string
      createdAt: string
      updatedAt: string
    }
  } | null
}

// ===== AUTOR =====
export interface Autor {
  id: number
  documentId: string
  nombreAutor: string
  slugAutor: string
  emailAutor: string
  biografia: string
  avatar?: StrapiImage
  rolAutor: string
  autorActivo: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface StrapiAutor {
  data: Autor | null
}

// ===== BLOG =====
export interface Blog {
  id: number
  documentId: string
  tituloBlog: string
  slugBlogs: string
  descripcionBlog: string
  contenidoBlog: string
  imgPortadaBlog?: StrapiImage
  FechaDePublicacion: string
  TiempoEstimado: number
  blogDestacado: boolean
  Seo: string
  blog?: {
    data: Categoria[]
  }
  autor?: {
    data: Autor | null
  }
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

// Mantener Articulo como alias para compatibilidad
export type Articulo = Blog

// ===== CATEGORÍA =====
export interface Categoria {
  id: number
  documentId: string
  NombreCategoria: string
  slugCategoria: string
  DescripcionCategoria: string
  color: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

// ===== NOTICIA =====
export interface NoticiaMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large?: {
      ext: string
      url: string
      hash: string
      mime: string
      name: string
      path: string | null
      size: number
      width: number
      height: number
      sizeInBytes: number
    }
    medium?: {
      ext: string
      url: string
      hash: string
      mime: string
      name: string
      path: string | null
      size: number
      width: number
      height: number
      sizeInBytes: number
    }
    small?: {
      ext: string
      url: string
      hash: string
      mime: string
      name: string
      path: string | null
      size: number
      width: number
      height: number
      sizeInBytes: number
    }
    thumbnail?: {
      ext: string
      url: string
      hash: string
      mime: string
      name: string
      path: string | null
      size: number
      width: number
      height: number
      sizeInBytes: number
    }
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Noticia {
  id: number
  documentId: string
  tituloNoticia: string
  slugNoticia: string
  descripcionNoticia: string
  multimediaNoticia?: NoticiaMedia | null
  link: string | null
  tipoDeContenidoNoticia: 'noticia' | 'campana' | 'evento' | 'alerta'
  fechaDeInicioNoticia: string
  fechaDeFinNoticia: string | null
  prioridad: number
  estaActiva: boolean
  verMasBoton: string
  buttonColor: 'primario' | 'secundario' | 'exitoso' | 'advertencia'
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

// ===== SEDE =====
export interface Sede {
  id: number
  attributes: {
    name: string
    address: string
    city: string
    state: string
    phone: string
    codigo: string
    latitude: number
    longitude: number
    category: 'Oficina' | 'Sucursal'
    enabled: boolean
    createdAt: string
    updatedAt: string
  }
}

// ===== PROGRAMA =====
export interface Programa {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    image: StrapiImage
    order: number
    enabled: boolean
    createdAt: string
    updatedAt: string
  }
}

// ===== ALIADO =====
export interface Aliado {
  id: number
  attributes: {
    name: string
    logo: StrapiImage
    maxHeight: string
    order: number
    enabled: boolean
    createdAt: string
    updatedAt: string
  }
}
