import { Formik, Form, Field, validateYupSchema } from "formik";
import { TextField } from "formik-mui";
import { Exercise } from "../models/exercisesList";
import { Button, LinearProgress, Alert } from "@mui/material";
import { useState } from "react";

export default function AddExercise(props: {
  addExercise: (exercise: Exercise) => void;
}) {
  const initialValues: Exercise = {
    exerciseName: "",
    exerciseRepetitions: 0,
    exerciseWeight: 0,
  };

  const [showMessage, setShowMessage] = useState(false);
  const [exerciseAdded, setExerciseAdded] = useState("");

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setShowMessage(true);
          setExerciseAdded(values.exerciseName);
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
          {showMessage && (
            <Alert severity="success">
              Exercise {exerciseAdded} was added with success!
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
}
