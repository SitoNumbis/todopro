import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// @mui/icons-material
import { Edit, Delete } from "@mui/icons-material";
// @mui
import Button from "../../MUI/Button";
import IconButton from "../../MUI/IconButton";

// contexts
import { useNotes } from "../../../context/NotesProvider";
import { useLanguage } from "../../../context/LanguageProvider";

// components
import Loading from "../../Loading/Loading";

function Note({ id, title, content, loading }) {
  const { setNotesState } = useNotes();

  const { languageState } = useLanguage();

  const noMargin = useMemo(() => {
    return css({ margin: 0 });
  }, []);

  const titleCss = useMemo(() => {
    return css({
      fontSize: "18px",
      color: loading ? "gray" : "#fff",
      textAlign: "left",
    });
  }, [loading]);

  const contentCss = useMemo(() => {
    return css({
      fontSize: "15px",
      fontStyle: "italic",
      color: loading ? "gray" : "#fff",
      textAlign: "left",
    });
  }, [loading]);

  const container = useMemo(() => {
    return css({ textDecoration: "none" });
  }, []);

  const operations = useMemo(() => {
    return css({ position: "absolute", right: "0px" });
  }, []);

  const div = useMemo(() => {
    return css({
      margin: "20px 0",
      width: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    });
  }, []);

  const note = useMemo(() => {
    return languageState.texts.note;
  }, [languageState]);

  const deleteNote = (e) => {
    setNotesState({ type: "remove", id });
    e.preventDefault();
  };

  const makeSmall = useMemo(() => {
    return css({
      transform: loading ? "scale(0.9)" : "scale(1)",
      transition: "all 500ms ease",
    });
  }, [loading]);

  return (
    <Link className={container} to={`/edit?id=${id}`}>
      <div className={`${div} appear`}>
        <Button
          sx={{
            minWidth: 0,
            minHeight: 0,
            width: "100%",
            textTransform: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
          className={`${makeSmall}`}
        >
          <p className={`${noMargin} ${titleCss}`}>
            {title && title.length ? title.substring(0, 18) : note.noTitle}
            {title && title.length > 18 ? "..." : ""}
          </p>
          <p className={`${noMargin} ${contentCss}`}>
            {content && content.length
              ? content.substring(0, 19)
              : note.noContent}
            {content && content.length > 19 ? "..." : ""}
          </p>
        </Button>

        {!loading ? (
          <div className={`${operations} grow`}>
            <IconButton color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={deleteNote} color="error">
              <Delete />
            </IconButton>
          </div>
        ) : (
          <Loading
            className="appear"
            sx={{
              width: "40px",
              height: "40px",
              minHeight: "40px",
              minWidth: "40px",
              ".loader": {
                width: "30px !important",
              },
            }}
          />
        )}
      </div>
    </Link>
  );
}

const NoteMemo = memo((props) => <Note {...props} />, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.id === newProps.id &&
    oldProps.title === newProps.title &&
    oldProps.content === newProps.content &&
    oldProps.loading === newProps.loading
  );
}

export default NoteMemo;
