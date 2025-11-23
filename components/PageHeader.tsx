interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

