type CertificateItemProps = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
};

export default function CertificateItem({
  title,
  issuer,
  date,
  credentialId,
  credentialUrl,
}: CertificateItemProps) {
  return (
    <div className="max-w-3xl">

      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-1 text-gray-400">
            {issuer}
          </p>
        </div>

        <p className="text-sm text-gray-400">
          {date}
        </p>

      </div>

      {credentialId && (
        <p className="mt-3 text-sm text-gray-500">
          Credential ID: {credentialId}
        </p>
      )}

      {credentialUrl && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-medium text-gray-300 underline underline-offset-4 transition hover:text-white"
        >
          Show Credential →
        </a>
      )}

    </div>
  );
}