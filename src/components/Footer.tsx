import Image from 'next/image';

// noinspection JSUnusedGlobalSymbols
export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Powered by</span>
            <Image
              src="/zitadel-logo.svg"
              alt="Zitadel"
              width={295}
              height={81}
              className="h-12 w-auto"
            />
          </div>
          <div className="flex max-w-2xl items-start">
            <div className="ml-3">
              <p className="text-right text-sm text-gray-600">
                <strong className="text-gray-800">Disclaimer:</strong>
                This is a demonstration application for reference purposes only.
                Do not use this code in production environments without proper
                security review and modifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
