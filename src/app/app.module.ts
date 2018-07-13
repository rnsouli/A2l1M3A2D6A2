import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS }   from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

// New Modules
//import { Ng4TwitterTimelineModule } from 'ng4-twitter-timeline/lib/index';
//import { TwitterService } from 'ng2-twitter';
import { MomentModule } from 'angular2-moment';


import { RecaptchaModule } from 'ng-recaptcha';

// Services
import { SharedService } from './services/shared.service';
import { GlobalService } from './services/global.service';
import { EnvironmentSpecificResolver } from './services/EnvironmentSpecificResolver';
import { AuthInterceptorService } from './services/auth-interceptor.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdvertiseComponent } from './components/advertise/advertise.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FunctionsService } from './services/functions.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BreakingNewsComponent } from './components/breaking-news/breaking-news.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeSlideshowComponent } from './components/home-slideshow/home-slideshow.component';
import { MiddleHomeComponent } from './components/middle-home/middle-home.component';
import { YellowMiddleHomeComponent } from './components/yellow-middle-home/yellow-middle-home.component';
import { WhiteMiddleHomeComponent } from './components/white-middle-home/white-middle-home.component';
import { LargeTabArticlesComponent } from './components/large-tab-articles/large-tab-articles.component';
import { MediumTabArticlesComponent } from './components/medium-tab-articles/medium-tab-articles.component';
import { BottomHomeComponent } from './components/bottom-home/bottom-home.component';
import { CategoryComponent } from './components/category/category.component';
import { CaricatureTemplateComponent } from './components/category/caricature-template/caricature-template.component';
import { HassubcategoriesTemplateComponent } from './components/category/hassubcategories-template/hassubcategories-template.component';
import { SubcategoryTemplateComponent } from './components/category/subcategory-template/subcategory-template.component';
import { EditorialTemplateComponent } from './components/category/editorial-template/editorial-template.component';
import { ListingTemplateComponent } from './components/category/listing-template/listing-template.component';
import { ArticlesComponent } from './components/category/articles/articles.component';
import { ArticlesTextComponent } from './components/category/articles-text/articles-text.component';
import { VideoPartialComponent } from './components/video-partial/video-partial.component';
import { VideosComponent } from './components/videos/videos.component';
import { SearchComponent } from './components/search/search.component';
import { SubcategoriesComponent } from './components/category/subcategories/subcategories.component';
import { DetailsComponent } from './components/details/details.component';
import { RelatedArticlesComponent } from './components/details/related-articles/related-articles.component';
import { IssuesComponent } from './components/issues/issues.component';
import { PollsComponent } from './components/polls/polls.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ActivePollComponent } from './components/active-poll/active-poll.component';

import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
import { WriterComponent } from './components/writer/writer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { IssueDetailsComponent } from './components/issues/issuedetails/issuedetails.component';
import { PrintComponent } from './components/details/print/print.component';
import { LatestArticlesComponent } from './components/details/latest-articles/latest-articles.component';
import { AlertComponent } from './components/alert/alert.component';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  //suppressScrollX: true
};


let routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'Ar', name: 'Ar', component: HomeComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'ar', name: 'ar', component: HomeComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'Home', name: 'Home', component: HomeComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'home', name: 'min_Home', component: HomeComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'AboutUs', component: AboutUsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'aboutus', component: AboutUsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'ContactUs', component: ContactUsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'contactus', component: ContactUsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'Advertise', component: AdvertiseComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'advertise', component: AdvertiseComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'PrivacyPolicy', component: PrivacyPolicyComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'privacypolicy', component: PrivacyPolicyComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'Category/:id', component: CategoryComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'Category/:id/:customUrlTitle', component: CategoryComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'Category/:id/:subId', component: CategoryComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'Category/:id/:subId/:customUrlTitle', component: CategoryComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'category/:id', component: CategoryComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'category/:id/:customUrlTitle', component: CategoryComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'category/:id/:subId', component: CategoryComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'category/:id/:subId/:customUrlTitle', component: CategoryComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'Videos', component: VideosComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'videos', component: VideosComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'Search', component: SearchComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'search', component: SearchComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'Details/:id', component: DetailsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'Details/:id/:customUrlTitle', component: DetailsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'Print/:id', component: PrintComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'details/:id', component: DetailsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'details/:id/:customUrlTitle', component: DetailsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'print/:id', component: PrintComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'Writer/:id', component: WriterComponent  },
  { path: 'Writer/:id/:customUrlTitle', component: WriterComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'writer/:id', component: WriterComponent  },
  { path: 'writer/:id/:customUrlTitle', component: WriterComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'Issues', component: IssuesComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'Issues/Details/:id', component: IssueDetailsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'issues', component: IssuesComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'issues/details/:id', component: IssueDetailsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'Polls', component: PollsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'polls', component: PollsComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: 'ArchiveViewer', component: ArchiveComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  { path: 'archiveviewer', component: ArchiveComponent, resolve: { envSpecific: EnvironmentSpecificResolver }  },
  
  { path: '404', name: 'NotFound', component: NotFoundComponent, resolve: { envSpecific: EnvironmentSpecificResolver }}, 
  { path: '**', redirectTo: '/404', resolve: { envSpecific: EnvironmentSpecificResolver }}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    AdvertiseComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    BreakingNewsComponent,
    SidebarComponent,
    HomeSlideshowComponent,
    MiddleHomeComponent,
    YellowMiddleHomeComponent,
    WhiteMiddleHomeComponent,
    LargeTabArticlesComponent,
    MediumTabArticlesComponent,
    BottomHomeComponent,
    CategoryComponent,
    CaricatureTemplateComponent,
    HassubcategoriesTemplateComponent,
    SubcategoryTemplateComponent,
    EditorialTemplateComponent,
    ListingTemplateComponent,
    ArticlesComponent,
    ArticlesTextComponent,
    VideoPartialComponent,
    VideosComponent,
    SearchComponent,
    SubcategoriesComponent,
    DetailsComponent,
    RelatedArticlesComponent,
    IssuesComponent,
    SafeUrlPipe,
    PollsComponent,
    ActivePollComponent,
    WriterComponent,
    NotFoundComponent,
    ArchiveComponent,
    IssueDetailsComponent,
    PrintComponent,
    LatestArticlesComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'al-mada'}),
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    HttpModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
  ],
  providers: [
    SharedService, 
    FunctionsService,
    GlobalService,
    EnvironmentSpecificResolver,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass:AuthInterceptorService, 
      multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
