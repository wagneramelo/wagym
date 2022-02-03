import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddExercise from "./AddExercise";
import { Exercise } from "../models/exercisesList";

export default function SimpleAccordion(props: {
  onAddExercise: (e: Exercise) => void;
  listExercise: Exercise[];
}) {
  const exerciseList = props.listExercise;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Exercises List</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {exerciseList.length == 0 && <p>There is no Exercise</p>}
          <ul>
            {exerciseList.map((exercise, index) => (
              <li key={index}>
                {exercise.exerciseName} --- {exercise.exerciseRepetitions} times
                --- {exercise.exerciseWeight} KG
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Add New Exercise</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddExercise addExercise={props.onAddExercise}></AddExercise>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
