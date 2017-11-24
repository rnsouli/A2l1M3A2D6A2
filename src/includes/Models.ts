
export interface GlobalModel{
    //headerCategories:Category[];
    footerCategoriesWithSub:Category[];
    footerCategoriesWithoutSub:Category[];
    socialMedia:SocialMedia[];
}
export interface SocialMedia{
    id:number;
    title:string;
    link:string;
    className:string;
}
export interface ArticleModel{
  id:number;
  customUrlTitle:string;
  title:string;
  image:string;
  smallDescription:string;
  date:Date;
  youtubeLink:string;
  galleryCount:number;
  writer:{
    id:number;
    name:string;
  }
  ArticleImages: string[];
  tags: TagModel[];
  urlBrowser:string;
  
  description:string;
  descriptionBeforeBanner:string;
  descriptionAfterBanner:string;
  bannerInDescription: string;
  viewCounter:number;
  isVideo: boolean;
  relatedArticles: ArticleModel[];
  latestNews: ArticleModel[];
  
  categoryId: number;
  subcategoryId: number;
  categoryCustomUrlTitle: string;
  subcategoryCustomUrlTitle: string;
  categoryTitle: string;
  subcategoryTitle: string;


}
export interface Category{
  id:number,
  title:string,
  isOnMenu:boolean,
  customUrlTitle:string
  SubCategories: Category[],
  articles: ArticleModel[]
}

export interface CategoryModel{
  firstArticle: ArticleModel;
  topArticles: ArticleModel[];
  videoArticles: ArticleModel[];
  firstTabOfArticles: ArticleModel[];
  secondTabOfArticles: ArticleModel[];
  articles: ArticleModel[];
  totalCount: number;
  customUrlTitle:string;
  title:string;
  id:number;
  templateId:number;
  parentCustomUrlTitle:string;
  parentTitle:string;
  parentId:number;
  //////////////////////////////////////////
  SubCategoryModels: SubCategoryModel[];
}

export interface SubCategoryModel{
  id: number;
  categoryTemplateId: number;
  title: string;
  customUrlTitle: string;
  whiteBoxArticles: ArticleModel[];
  smallWhiteBoxArticles: ArticleModel[];
  middleBigArticles: ArticleModel[];
  middleSmallArticles: ArticleModel;
  bottomBigArticle: ArticleModel;
  bottomSmallArticles: ArticleModel[];
  bottomArticles: ArticleModel[];
}

export interface whiteBox{
  whiteBoxArticles:ArticleModel[];
  smallWhiteBoxArticles:ArticleModel[];
  largeTabCategory: Category;
}

export interface SocialMediaModel{
    facebook:string;
    twitter:string;
    linkedin:string;
    email:string;
}  
 export interface SharedModel{
    //headerType:string;
    currentRoute:string;
    //categoryTitle:string;
    //categoryId:number;
    //customUrlTitle:string;
    socialMedia:SocialMedia[];
    headerCategories:Category[],
    idsToRemove: string;
    currentCategoryId:number;
}

export interface IssueModel{
  latestEntry: issueModel;
  entries:{
    year:number;
    entries: issueModel[];
  };
}

export interface issueModel{
  id:number;
  title:string;
  date:string;
}

export interface ContactInfoModel{
  phone:string;
  address:string;
  email:string;  
  name:string;
  position:string;
}
export interface ContactFormModel{
  fullName:string;
  countryId:number;
  email:string;
  phone:string;
  message:string;
}
export interface AdvertiseFormModel{
  fullName:string;
  countryId:number;
  email:string;
  phone:string;
  message:string;
  company:string;
  budgetId:number;
  ageId:number;
  timeId:number;
  genderId:number;
  isSingle: boolean;
}
export interface Country{
  id:number;
  title:string;
}
export interface SharerModel{
  id:number;
  image:string;
  name:string;
}
export interface SharedWithMeModel{
  id:number;
  isFolder:boolean;
  shareDate:Date;
  sharer:SharerModel;
  article:ArticleModel;
}
export interface NewsletterModel{
  email:string;
}
export interface WriterModel{
  id:number;
  name:string;
  title:string;// same as name - to eliminate confusion
  image:string;
  articleCount:number;
  socialMedia:SocialMediaModel;
}
export interface FormsData{
  countries:IntStringModel[];
  inquiryTypes:IntStringModel[];
}
export interface IntStringModel{
  key:number;
  value:string;
}
export interface TagModel{
  id:number;
  title:string; 
  customUrlTitle:string; 
}
export interface FeaturedRecentModel{
  featured:ArticleModel[];
  recent:ArticleModel[];
}
export interface CorporatePageTreeModel{
  title:string;
  description:string;
  smallDescription:string;
}
export interface LabelValueModel{
  label:string;
  value:string;
}
export interface CategoryWithArticles{
  id:number;
  title:string;
  customUrlTitle:string;
  articles:ArticleModel[];
}