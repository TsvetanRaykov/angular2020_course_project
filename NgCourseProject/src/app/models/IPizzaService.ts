import { IPizza } from './IPizza';
import { Observable } from 'rxjs';

export interface IPizzaService {
  create(pizza: IPizza): Observable<IPizza>;
  getAll(): Observable<IPizza[]>;
  getOneById(id: string): Observable<IPizza>;
  update(pizza: IPizza): Observable<IPizza>;
  delete(id: string): Observable<boolean>;
}
