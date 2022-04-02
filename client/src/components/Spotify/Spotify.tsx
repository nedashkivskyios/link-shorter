import React from "react";

const Spotify = () => {
  return (
    <div style={{marginTop: "10px"}}>
      <iframe
        style={{borderRadius: "12px"}}
        src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </div>
  );
};

export default Spotify;
