function Header() {
  return (
    <div className="flex flex-col items-center mt-8 text-center">
      <h1 className="font-bold text-5xl text-blue-500">Sentiment Analysis</h1>
      <p className="w-2/3 my-4">
        Aplikasi ini dirancang untuk menganalisis dan memprediksi sentimen dalam
        bahasa Indonesia, khususnya terkait pemilihan umum pemimpin. Kami
        membantu memprediksi sentimen opini publik dan menyajikan visualisasi
        pola kecenderungan opini masyarakat secara akurat.
      </p>
    </div>
  );
}

export default Header;
