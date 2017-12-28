import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewContainerRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { MainComponent } from './home/main/main.component';
import { NavComponent } from './home/nav/nav.component';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './blog/article/article.component';
import { ProductsComponent } from './products/products.component';
import { ItemComponent, DialogDataExampleDialog } from './products/item/item.component';
import {PageNotFoundComponent} from './home/page-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from "@angular/material";
import { CarouselComponent, CarouselItemElement } from "./products/item/carousel.component";
import { CarouselItemDirective } from "./products/item/carousel-item.directive";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    BlogComponent,
    ArticleComponent,
    ProductsComponent,
    ItemComponent,
    PageNotFoundComponent,
    DialogDataExampleDialog,
    CarouselComponent,
    CarouselItemElement,
    CarouselItemDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ScrollToModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ DialogDataExampleDialog ],
  bootstrap: [AppComponent]
})
export class AppModule { }
