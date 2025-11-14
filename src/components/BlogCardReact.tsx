import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface BlogCardProps {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  date: string;
  readTime: number;
  category?: {
    name: string;
    color: string;
    slug: string;
  };
  author: {
    name: string;
    avatar: string | null;
  };
  featured?: boolean;
  priority?: boolean; // Para las primeras 3 imágenes
}

// SVG icons inline para evitar importar lucide-react (1MB)
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export function BlogCardReact({
  title,
  slug,
  description,
  imageUrl,
  date,
  readTime,
  category,
  author,
  featured = false,
  priority = false,
}: BlogCardProps) {
  return (
    <article
      className={`blog-card-wrapper transition-all duration-300 ${featured ? 'featured' : ''}`}
      data-categoria={category?.slug || 'sin-categoria'}
    >
      <a href={`/blog/${slug}`} className="block h-full group no-underline">
        <Card className="h-full flex flex-col overflow-hidden border-gray-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          {/* Featured Badge */}
          {featured && (
            <span className="absolute top-3 right-3 z-10 bg-gradient-to-r from-[#19b8e9] to-[#0e3551] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
              <StarIcon />
              Destacado
            </span>
          )}

          {/* Image */}
          <div className="relative w-full h-44 sm:h-48 md:h-52 lg:h-48 overflow-hidden bg-gray-100">
            <img
              src={imageUrl}
              alt={title}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Category Badge */}
            {category && (
              <span
                className="absolute bottom-2.5 left-2.5 px-3 py-1.5 rounded-xl text-white text-xs font-semibold backdrop-blur-sm shadow-md"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
            )}
          </div>

          {/* Content */}
          <CardContent className="p-4 sm:p-5 flex flex-col flex-1">
            <h3 className="card-title text-lg sm:text-xl font-bold text-[#0e3551] mb-2.5 line-clamp-2 leading-snug">
              {title}
            </h3>

            <p className="card-description text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-1">
              {description}
            </p>

            {/* Botón Ver más */}
            <div className="mb-3">
              <span className="inline-flex items-center gap-2 text-[#19b8e9] font-semibold text-sm hover:gap-3 transition-all duration-300">
                Ver más
                <ArrowRightIcon />
              </span>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="pt-3 pb-4 px-4 sm:px-5 border-t border-gray-200 flex items-center justify-between gap-3">
            {/* Author */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#19b8e9] text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
                  {author.name.charAt(0)}
                </div>
              )}
              <span className="text-xs sm:text-sm font-medium text-[#0e3551] truncate">
                {author.name}
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-col items-end gap-0.5 text-xs text-gray-500 flex-shrink-0">
              <time dateTime={date} className="whitespace-nowrap">
                {date}
              </time>
              <span className="font-medium whitespace-nowrap">{readTime} min</span>
            </div>
          </CardFooter>
        </Card>
      </a>
    </article>
  );
}
