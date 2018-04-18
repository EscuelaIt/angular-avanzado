import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		loadChildren: "@home/home.module#HomeModule"
	},
	{
		path: "about",
		loadChildren: "@routes/about/about.module#AboutModule"
	},
	{
		path: "month/:y/:m",
		loadChildren: "@routes/month/month.module#MonthModule"
	},
	{
		path: "credentials",
		loadChildren:
			"@routes/credentials/credentials.module#CredentialsModule"
	},
	{
		path: "not-found",
		loadChildren:
			"@routes/not-found/not-found.module#NotFoundModule"
	},
	{
		path: "**",
		redirectTo: "not-found"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
