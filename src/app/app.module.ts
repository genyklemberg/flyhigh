import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { ServicesComponent } from './services/services.component';
import {ScrollService} from './scroll.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {CarouselComponent, CarouselItemElement} from './products/item/carousel.component';
import {CarouselItemDirective} from './products/item/carousel-item.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ProductService} from './products/product.service';
import {BlogService} from './blog/blog.service';
import { SuccesComponent } from './home/succes.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoadingSpinnerComponent } from './home/loading-spinner.component';
import {HttpClientModule} from '@angular/common/http';
import {MailService} from './mail.service';
import {MatSnackBarModule} from '@angular/material';
import { UploadsFormComponent } from './admin-page/uploads/uploads-form.component';
import {UploadsService} from './admin-page/uploads/uploads.service';
import {AdminPageGuard} from './admin-page.guard';

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
    CarouselItemDirective,
    ServicesComponent,
    SuccesComponent,
    AdminPageComponent,
    LoadingSpinnerComponent,
    UploadsFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ScrollToModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  entryComponents: [ DialogDataExampleDialog ],
  providers: [ScrollService, ProductService, BlogService, MailService, UploadsService, AdminPageGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
