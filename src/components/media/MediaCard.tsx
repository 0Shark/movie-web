import { Link } from "react-router-dom";
import { DotList } from "@/components/text/DotList";
import { MWMediaMeta } from "@/backend/metadata/types";
import { mediaTypeToJW } from "@/backend/metadata/justwatch";

export interface MediaCardProps {
  media: MWMediaMeta;
  linkable?: boolean;
}

// TODO add progress back

function MediaCardContent({ media, linkable }: MediaCardProps) {
  return (
    <div
      className={`group -m-3 mb-2 rounded-xl bg-denim-300 bg-opacity-0 transition-colors duration-100 ${
        linkable ? "hover:bg-opacity-100" : ""
      }`}
    >
      <article
        className={`relative mb-2 p-3 transition-transform duration-100 ${
          linkable ? "group-hover:scale-95" : ""
        }`}
      >
        <div
          className="mb-4 aspect-[2/3] w-full rounded-xl bg-denim-500 bg-cover"
          style={{
            backgroundImage: media.poster ? `url(${media.poster})` : undefined,
          }}
        />
        <h1 className="mb-1 max-h-[4.5rem] text-ellipsis break-words font-bold text-white line-clamp-3">
          <span>{media.title}</span>
        </h1>
        <DotList className="text-xs" content={[media.type, media.year]} />
      </article>
    </div>
  );
}

export function MediaCard(props: MediaCardProps) {
  const content = <MediaCardContent {...props} />;

  if (!props.linkable) return <span>{content}</span>;
  return (
    <Link
      to={`/media/${encodeURIComponent(
        mediaTypeToJW(props.media.type)
      )}-${encodeURIComponent(props.media.id)}`}
    >
      {content}
    </Link>
  );
}
