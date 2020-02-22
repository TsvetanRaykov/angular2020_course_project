import { Injectable } from '@angular/core';
import { IPizzaService, IPizza } from 'src/app/models';
import { Observable, from, of } from 'rxjs';
import { DataStoreService } from 'kinvey-angular-sdk';
import { FilesService } from 'kinvey-angular-sdk';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KinveyPizzaService implements IPizzaService {
  constructor(datastoreService: DataStoreService, private fileService: FilesService) {
    this.collection = datastoreService.collection('Pizza');
  }
  collection: any;
  delete(id: string): Observable<any> {
    return from(this.collection.removeById(id));
  }
  create(pizza: IPizza): Observable<IPizza> {
    return from(this.update(pizza));
  }
  getAll(): Observable<IPizza[]> {
    return this.collection.find();
  }
  getOneById(id: string): Observable<IPizza> {
    return this.collection.findById(id);
  }
  update(pizza: IPizza): Observable<IPizza> {
    return from(this.collection.save(pizza)).pipe(map(p => JSON.parse(JSON.stringify(p))));
  }
}
