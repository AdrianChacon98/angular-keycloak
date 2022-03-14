import { Component } from '@angular/core';
import { AuthConfig,  NullValidationHandler,  OAuthService } from 'angular-oauth2-oidc';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  private authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/tutorial',
    redirectUri: window.location.origin,
    clientId: 'tutorial-frontend',
    responseType: 'code',
    scope: 'openid profile email roles',
    showDebugInformation: true,

  };



  constructor(private oauthService:OAuthService,private loginService:LoginService){
    this.configure();
  }


  private configure():void{
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(()=>this.oauthService.tryLogin())
    .then(()=>{
      if(this.oauthService.getIdentityClaims()){

        this.loginService.setIsLogged(this.getIsLogged());
        this.loginService.setIsAdmin(this.getIsAdmin());
        const userClaims: any = this.oauthService.getIdentityClaims();

        if(userClaims){
          const username = userClaims.preferred_username ? userClaims.preferred_username : "";
          this.loginService.setUsername(username);
        }


      }
    });

  }


  public getIsLogged():boolean{
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getIsAdmin():boolean{
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson=atob(payload);
    const payloadDecoded=JSON.parse(payloadDecodedJson);
    console.log(payloadDecoded.realm_access);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }



}
