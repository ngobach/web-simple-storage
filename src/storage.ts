import { Backend } from './backends';
import { Coding } from './codings';

class SimpleStorage<T = {}> {
  constructor(
    private backend: Backend,
    private coding: Coding,
  ) {}
}

export default SimpleStorage;
