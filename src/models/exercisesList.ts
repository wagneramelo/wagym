export class Exercise {
  exerciseId?: Date;
  exerciseName: string;
  exerciseRepetitions: number;
  exerciseWeight: number;

  constructor(
    exerciseName: string,
    exerciseRepetitions: number,
    exerciseWeight: number
  ) {
    this.exerciseId = new Date();
    this.exerciseName = exerciseName;
    this.exerciseRepetitions = exerciseRepetitions;
    this.exerciseWeight = exerciseWeight;
  }
}

export const listExercise: Exercise[] = [];
