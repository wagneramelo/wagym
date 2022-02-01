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
  const [pointer, setPointer] = useState(0);
  const TIME_REST_SECONDS = 3;

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

  useEffect(() => {
    if (time === TIME_REST_SECONDS + 1) {
      clearInterval(timerInterval!);
      setExerciseState(exercisesState.EXERCISING);
      setTime(0);
    }
  }, [time, timerInterval]);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Clock
        startCounter={startCounter}
        seconds={time}
        totalSeconds={TIME_REST_SECONDS}
      ></Clock>
      <h2>
        {exerciseState === 0
          ? "Resting"
          : exerciseList.length > 0
          ? "Doing " + exerciseList[pointer].exerciseName
          : "Please add a Exercise List"}
      </h2>
      <SimpleAccordion
        onAddExercise={addExercise}
        listExercise={exerciseList}
      ></SimpleAccordion>
    </div>
  );
}

export default App;
