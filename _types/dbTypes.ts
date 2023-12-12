export type A_ArticleComment = {
id : number;
title : string;
comment : string;
likes? : number;
parentCommentId? : number;
establishmentId? : string;
establishmentPublicId : string;
userId? : number;
articleId? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type Application = {
id : number;
userId? : number;
email : string;
telephone : string;
firstLine? : string;
secondLine? : string;
zip? : string;
country? : string;
buildingNumber? : string;
city? : string;
county? : string;
institutionName? : string;
type : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type Article = {
id : number;
title : string;
description? : string;
content? : string;
establishmentId? : string;
userId? : number;
likes? : number;
attachments? : unknown[];
allowComments? : number;
showAuthor? : number;
showDate? : number;
showLikes? : number;
thumbnail? : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
commentKey? : string;
categoryIds? : unknown[];
};

export type ArticleCategory = {
id : number;
label : string;
description? : string;
establishmentId? : string;
userId? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type ArticleCategoryId = {
id : number;
establishmentId? : string;
articleId? : number;
articleCategoryId? : number;
userId? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type Course = {
id : number;
userId : string;
establishmentId : string;
title : string;
description? : string;
imageUrl? : string;
price? : unknown;
progress? : string;
isPublished? : number;
categoryId? : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type CourseAttachment = {
id : number;
name : string;
url : string;
courseId : string;
userId : number;
establishmentId : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type CourseCategory = {
id : number;
name : string;
userId : number;
establishmentId : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type CourseChapter = {
id : number;
courseId : string;
positionInCourse : string;
userId : string;
establishmentId : string;
title : string;
description? : string;
videoUrl? : string;
position? : number;
isPublished? : number;
isFree? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type CoursePurchase = {
id : number;
userId : string;
establishmentId : string;
courseId : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type CourseUserProgress = {
id : number;
userId : string;
establishmentId : string;
chapterId : string;
isCompleted? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type CourseVideoData = {
id : number;
assetId : string;
playbackId? : string;
chapterId : string;
userId? : string;
establishmentId : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type Establishment = {
id : string;
publicId : string;
name : string;
userId : number;
type : string;
dbId? : number;
geoString? : string;
zip? : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type Event = {
id : number;
title : string;
date? : Date;
establishmentId? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type File = {
id : number;
name : string;
key : string;
establishmentId? : string;
folderId? : number;
size? : number;
type? : string;
userId? : number;
public? : number;
createdAt : Date;
updatedAt : Date;
lastViewed? : Date;
favouriteIds? : unknown[];
deletedAt? : Date;
};

export type Folder = {
id : number;
name : string;
establishmentId? : string;
folderId? : number;
userId? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type GlobalSetting = {
id : number;
establishmentId? : string;
articles? : unknown[];
prayerTimes? : unknown[];
events? : unknown[];
charitableCauses? : unknown[];
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type OrgUser = {
id : number;
userId : number;
establishmentName? : string;
establishmentId : string;
role : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type Prayer = {
id : number;
title : string;
description : string;
establishmentId : string;
timesData? : unknown[];
userId : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type PrayerTimesScreen = {
id : number;
title : string;
description : string;
establishmentId : string;
topMessage? : string;
bottomMessage? : string;
images? : unknown[];
prayerId? : number;
theme? : unknown[];
userId : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type SessionStorage = {
token : string;
data : unknown[];
userId : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type Site = {
id : number;
label : string;
domain? : string;
description? : string;
establishmentId? : string;
establishmentPublicId? : string;
thumbnail? : string;
userId? : number;
permissions? : unknown[];
adminIds? : unknown[];
siteData? : unknown[];
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type SitePage = {
id : number;
label : string;
description? : string;
content? : string;
siteName? : string;
establishmentId? : string;
userId? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type StripeCustomer = {
id : number;
userId : string;
establishmentId : string;
stripeCustomerId : string;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

export type User = {
id : number;
privateId : string;
email : string;
hashedPassword : string;
firstName? : string;
lastName? : string;
resetToken? : string;
salt? : string;
resetTokenExpiresAt? : Date;
mobile? : string;
isEmailVerified? : number;
isMobileVerified? : number;
isDisabled? : number;
createdAt : Date;
updatedAt : Date;
deletedAt? : Date;
};

