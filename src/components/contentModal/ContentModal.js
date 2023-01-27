import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { img_500 } from "../../config";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import Carousel from "../carousel/Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "#0d0d0f",
  border: "2px solid #000",
  boxShadow: "0 8px 8px -4px green",
  p: 4,
  color: "white",
};

export default function ContentModal({ children, id, media_type }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  // eslint-disable-next-line
  const [type, setType] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchContent = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const data = await res.json();
    setContent(data);
  };

  const fetchVideo = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const data = await res.json();
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchContent();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div className="container h-[90vh] overflow-y-auto md:flex gap-7">
                <div className="md:w-[50%]">
                  <div className="mb-4">
                    <img
                      src={`${img_500}/${content.backdrop_path}`}
                      alt={"cast"}
                    />
                  </div>
                  <div>
                    <h2 className="text-bold text-2xl mb-3">
                      {content.title || content.name}
                    </h2>
                    <h5 className="text-start text-gray-500 w-[98%] mb-1">
                      {content.overview}
                    </h5>
                    <h6 className="text-bold text-gray-500 mb-1">
                      Release Date:
                      {content.release_date || content.first_air_date}
                    </h6>
                    <Button
                      variant={"contained"}
                      startIcon={<TheatersOutlinedIcon />}
                      color={"primary"}
                      target={"_blank"}
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Play Trailer
                    </Button>
                  </div>
                </div>
                <div className="movieCast md:w-[50%] mt-4 ">
                  <Carousel
                    className={"md:flex flex-wrap md:gap-2 flex gap-4"}
                    media_type={media_type}
                    id={id}
                  />
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </div>
  );
}
