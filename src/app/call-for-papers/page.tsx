export default function CallForPapers() {
  const themes = [
    "Popular Music and Contemporary Culture", "Cinema, Television and Streaming Platforms",
    "Social Media and Digital Cultures", "Youth, Identity and Popular Culture",
    "Folk Traditions and Popular Culture", "Gender and Representation in Popular Media",
    "Celebrity Culture and Fandom", "Migration, Diaspora and Cultural Flows",
    "Popular Religion and Public Culture", "Language, Literature and Popular Narratives",
    "Indigenous Cultures and Popular Media", "Cultural Heritage and Popular Culture",
    "Artificial Intelligence and Digital Creativity", "Sports, Leisure and Popular Culture",
    "Other related themes"
  ];
  return (
    <div className="bg-brand-cream min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif text-brand-darkNavy mb-8">Indicative Sub-Themes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themes.map((t, idx) => (
          <div key={idx} className="bg-white p-4 rounded border border-brand-gold/20 text-sm font-medium">{t}</div>
        ))}
      </div>
    </div>
  );
}
