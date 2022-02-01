import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { Exercise } from "../models/exercisesList";
import { Button, LinearProgress } from "@mui/material";

export default function AddExercise(props: {
  addExercise: (exercise: Exercise) => void;
}) {
  const initialValues: Exercise = {
    exerciseName: "",
    exerciseRepetitions: 0,
    exerciseWeight: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
          props.addExercise(
            new Exercise(
              values.exerciseName,
              values.exerciseRepetitions,
              values.exerciseWeight
            )
          );
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="exerciseName"
            type="text"
            label="Exercise Name"
          />
          <br />
          <Field
            component={TextField}
            type="number"
            label="Exercise Repetitions"
            name="exerciseRepetitions"
          />
          <br />
          <Field
            component={TextField}
            type="number"
            label="Exercise Weight(Kg)"
            name="exerciseWeight"
          />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Add Exercise
          </Button>
        </Form>
      )}
    </Formik>
  );
}
