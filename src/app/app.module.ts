import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule }   from '@angular/common/http';

import { RouterModule } from '@angular/router';

// New Modules
//import { Ng4TwitterTimelineModule } from 'ng4-twitter-timeline/lib/index';
//import { TwitterService } from 'ng2-twitter';
import { MomentModule } from 'angular2-moment';

// Services
import { SharedService } from './services/shared.service';

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


let routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'  },
  { path: 'Home', component: HomeComponent  },
  { path: 'AboutUs', component: AboutUsComponent  },
  { path: 'ContactUs', component: ContactUsComponent  },
  { path: 'Advertise', component: AdvertiseComponent  },
  { path: 'PrivacyPolicy', component: PrivacyPolicyComponent  },
  { path: 'Category/:id', component: CategoryComponent  },
  { path: 'Category/:id/:customUrlTitle', component: CategoryComponent  },
  { path: 'Category/:id/:subId', component: CategoryComponent  },
  { path: 'Category/:id/:subId/:customUrlTitle', component: CategoryComponent  },
  { path: 'Videos', component: VideosComponent  },
  { path: 'Search', component: SearchComponent  },
  { path: 'Details/:id', component: DetailsComponent  },
  { path: 'Details/:id/:customUrlTitle', component: DetailsComponent  },
  { path: 'Issues', component: IssuesComponent  },
  { path: 'Polls', component: PollsComponent  },
  { path: '**', redirectTo:''  }
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule
  ],
  providers: [
    SharedService, 
    FunctionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
