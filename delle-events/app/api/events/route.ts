import {NextRequest, NextResponse} from "next/server";
import {isInstanceOf} from "@posthog/core";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database/event.model";
import { v2 as cloudinary } from 'cloudinary';



export async  function POST(req: NextRequest){
    try{
        await connectDB();

        const formData = await req.formData();
        let event;

        try{
            event = Object.fromEntries(formData.entries());
        }catch (e){
            return  NextResponse.json({message: 'Invalid Event Data'},{status: 400})
        }
        const file =  formData.get('image') as File;

        if(!file){
            return NextResponse.json({message : 'Image is required'}, { status : 400})
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'Delle-Events/delle-events' }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string}).secure_url;

        const createEvent = await Event.create(event);

        return NextResponse.json({message: 'Event created successfully', event: createEvent}, {status: 201});

    }   catch (e){
        console.error(e);
        return NextResponse.json ({ message: 'Event Creation Failed', error: e instanceof Error ? e.message : 'Unknown Error'}, {status: 500})
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 });

        return NextResponse.json(
            {
                message: "Events fetched successfully",
                events,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Event fetching failed",
                error: String(error),
            },
            { status: 500 }
        );
    }
}
