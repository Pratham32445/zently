-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userAvatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SocialLinks" (
    "Id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linkedinId" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL,
    "InstagramId" TEXT NOT NULL,

    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLinks_userId_key" ON "SocialLinks"("userId");

-- AddForeignKey
ALTER TABLE "SocialLinks" ADD CONSTRAINT "SocialLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
