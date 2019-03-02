import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    baserl = 'http://127.0.0.1:8000/';
    httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(private http: HttpClient) {}
    getClientes(): Observable<any> {
        return this.http.get(this.baserl + 'clientes/',
        {headers: this.httpHeaders});
    }
    getCliente(id): Observable<any> {
        return this.http.get(this.baserl + 'clientes/' + id + '/',
        {headers: this.httpHeaders});
    }
    updateCliente(c): Observable<any> {
        const CLIENTE = {id: c.id, nombre: c.nombre, telefono: c.telefono, dni: c.dni,
            mayorista: c.mayorista, proveedor: c.proveedor, sexo: c.sexo, estado: c.estado };
        return this.http.put(this.baserl + 'clientes/' + CLIENTE.id + '/', CLIENTE,
        {headers: this.httpHeaders});
    }
}
