import LockIcon from "@mui/icons-material/Lock";
import { Grid, IconButton } from "@mui/joy";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { usePyIOContext } from "./PyIOContext";
import { exercisesMod } from "./exercises/phanon-mod";
import Markdown from "react-markdown";

export const ExerciseList = () => {
  const { currExercise, setCurrExercise } = usePyIOContext();
  return (
    <Grid columns={1} container maxWidth="250px">
      {exercisesMod.map((exercise) => (
        <Grid key={exercise.id}>
          {exercise.id === currExercise.id ? (
            <IconButton>
              <LockOpenIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setCurrExercise(exercise);
              }}
            >
              <LockIcon />
            </IconButton>
          )}
        </Grid>
      ))}
    </Grid>
  );
};
