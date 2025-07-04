CREATE TABLE "device_info" (
	"DeviceID" integer PRIMARY KEY NOT NULL,
	"DeviceName" varchar(100),
	"DeviceDescription" varchar(255),
	"CanWalk" varchar(10),
	"HandTrouble" varchar(10),
	"CanTalk" varchar(10),
	"CanSee" varchar(10),
	"CanHear" varchar(10),
	"NeedAssistance" varchar(10),
	"Category" varchar(50),
	"Image" varchar(1000),
	"Website" varchar(1000)
);
--> statement-breakpoint
CREATE TABLE "specialist_info" (
	"SpecialistID" integer PRIMARY KEY NOT NULL,
	"SpecialistName" varchar(100),
	"Specialties" varchar(255),
	"Address" varchar(255),
	"Expertise" varchar(255),
	"Classification" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar NOT NULL;