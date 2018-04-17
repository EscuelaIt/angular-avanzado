import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CredentialsRoutingModule } from "./credentials-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { CredentialsComponent } from "@routes/credentials/credentials.component";
import { CredentialsFormComponent } from './credentials-form/credentials-form.component';

@NgModule({
  imports: [CommonModule, CredentialsRoutingModule, ComponentsModule],
  declarations: [CredentialsComponent, CredentialsFormComponent]
})
export class CredentialsModule {}
