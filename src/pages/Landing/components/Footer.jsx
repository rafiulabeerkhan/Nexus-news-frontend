export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-white z-10 relative">
      {/* Top red bar */}
      <div className="bg-primary-600">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h2 className="text-3xl font-bold">
            NexusNews
          </h2>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Top Text */}
        <div className="text-lg font-medium mb-6">
          Why you can trust NexusNews
        </div>

        <div className="border-t border-gray-700 mb-8"></div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 text-lg font-medium">
          <a href="#" className="hover:underline">
            Terms of Use
          </a>

          <a href="#" className="hover:underline">
            Privacy Policy
          </a>

          <a href="#" className="hover:underline">
            Contact NexusNews
          </a>

          <a href="#" className="hover:underline">
            Do not share or sell my info
          </a>

          <a href="#" className="hover:underline">
            About NexusNews
          </a>

          <a href="#" className="hover:underline">
            Cookies
          </a>

          <a href="#" className="hover:underline">
            NexusNews in other languages
          </a>
        </div>

        <div className="border-t border-gray-700 mt-8 mb-5"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 pt-6 border-t border-gray-800 gap-4">
          <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
            © {new Date().getFullYear()} NexusNews is not responsible for the content of external sites.
            Read about our approach to external linking.
          </p>
          
          <div className="text-sm text-gray-400 bg-black/20 px-4 py-2 rounded-lg border border-white/5 flex flex-wrap items-center gap-2">
            Developed and maintained by
            <a href="https://www.emeraldlabs.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 hover:underline transition-colors">
              <img src="/EmeraldLabs.png" alt="EmeraldLabs Logo" className="h-6 object-contain" />
              EmeraldLabs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
