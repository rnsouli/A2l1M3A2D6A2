import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
 
import { GlobalLinks } from './../services/global.service';
import { GlobalService } from './../services/global.service';
 
@Injectable()
export class EnvironmentSpecificResolver implements Resolve<GlobalLinks> {
  constructor(private globalService: GlobalService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<GlobalLinks> {
    return this.globalService.loadEnvironment()
            .then(es => {
                this.globalService.setGlobalLinks(es);
                return this.globalService.globalLinks;
            }, error => {
                console.log(error);
                return null;
            });
  }
}