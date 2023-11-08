import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useDispatch } from "react-redux";
import { deleteNotes, archiveNote } from "../../redux/slices/notes";
import NotesFormEdit from "../Forms/NotesFormEdit";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteModal from "../ModalForm/DeleteModal";

const CustomizedAccordion = ({ notes = [], type = "notes" }) => {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = (id) => {
    dispatch(deleteNotes(id));
  };
  const handleArchive = (id) => {
    if (type === "notes") {
      dispatch(archiveNote(id, { archive: true }));
    } else {
      dispatch(archiveNote(id, { archive: false }));
    }
  };
  return (
    <div className={`flex flex-col w-[80%] items-center max-h-[300px] ${notes.length > 0 && "datagrid-scroll mt-10"}`}>
      {notes?.length > 0 ? (
        notes.map((note, index) => (
          <div className="flex flex-row bg-[#1e1e1e] w-[100%]" key={index}>
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{ width: "100%" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography sx={{ width: "33%", flexShrink: 0, color: "#f9b17a" }}>{note.label}</Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {note.description.length > 25 ? note.description.slice(0, 30) + " ..." : note.description}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="break-all">{note.description}</Typography>
              </AccordionDetails>
            </Accordion>
            <div className="flex flex-row items-center">
              {type === "notes" ? (
                <div className="flex flex-row items-center">
                  <NotesFormEdit data={note} />
                  <IconButton onClick={() => handleArchive(note.id)}>
                    <ArchiveIcon />
                  </IconButton>
                </div>
              ) : (
                <IconButton onClick={() => handleArchive(note.id)}>
                  <UnarchiveIcon />
                </IconButton>
              )}
              <DeleteModal handleDelete={handleDelete} data={note} type="NOGRID" />
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-white text-3xl">{type === "notes" ? "No hay notas creadas" : "No hay notas archivadas"}</h1>
      )}
    </div>
  );
};

export default CustomizedAccordion;
