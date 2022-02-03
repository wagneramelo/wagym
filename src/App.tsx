import { useEffect, useState } from "react";
import "./App.css";
import Clock from "./components/Clock";
import exercisesState from "./models/exercisesState";
import SimpleAccordion from "./components/configList";
import { Exercise } from "./models/exercisesList";

function App() {
  const [time, setTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();
  const [exerciseState, setExerciseState] = useState<number>(1);
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise>();
  const [interation, setInteration] = useState(0);
  const [exerciseNum, setExerciseNum] = useState(0);
  const TIME_REST_SECONDS = 3;

  // setCurrentExercise(exerciseList[interation]);

  const startCounter = () => {
    if (exerciseState === exercisesState.RESTING) {
      clearInterval(timerInterval!);
      setTime(0);
      setExerciseState(exercisesState.EXERCISING);

      return;
    }
    setExerciseState(exercisesState.RESTING);
    const timer = setInterval(() => {
      setTime((prevState) => {
        return prevState + 1;
      });
    }, 1000);

    setTimerInterval(timer);
  };

  const addExercise = (exercise: Exercise) => {
    setExerciseList((prevState) => {
      const newExercise = prevState.slice();
      newExercise.push(exercise);
      return newExercise;
    });
  };

  const isChangeExercise = (exercise: Exercise, interation: number) => {
    const qtyExerciseRep = exercise.exerciseRepetitions;

    if (interation + 1 === qtyExerciseRep) {
      setCurrentExercise(exerciseList[exerciseNum + 1]);
      setExerciseNum((prev) => prev + 1);
      setInteration(0);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (time === TIME_REST_SECONDS + 1) {
      clearInterval(timerInterval!);
      setExerciseState(exercisesState.EXERCISING);
      setInteration((prevState) => prevState + 1);
      if (isChangeExercise(currentExercise!, interation)) {
      }
      setTime(0);
    }
  }, [time, timerInterval]);

  useEffect(() => {
    setCurrentExercise(exerciseList[interation]);
  }, [exerciseList]);

  let exerciseMoment =
    exerciseState === 0
      ? "Resting"
      : exerciseList.length > 0
      ? `Doing ${currentExercise?.exerciseName} with ${currentExercise?.exerciseWeight} KG.`
      : "Please add a Exercise List";

  if (exerciseList.length == exerciseNum && exerciseList.length !== 0) {
    exerciseMoment = "CONGRATULATIONS! YOU'VE FINISHED YOUR TRAIN!";
  }

  const clockDiv =
    exerciseList.length == exerciseNum && exerciseList.length !== 0 ? null : (
      <Clock
        startCounter={startCounter}
        seconds={time}
        totalSeconds={TIME_REST_SECONDS}
      ></Clock>
    );

  return (
    <div className="App">
      {clockDiv}
      <h2>{exerciseMoment}</h2>
      <SimpleAccordion
        onAddExercise={addExercise}
        listExercise={exerciseList}
      ></SimpleAccordion>
    </div>
  );
}

export default App;
