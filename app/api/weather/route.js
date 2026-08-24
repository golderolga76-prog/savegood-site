import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "Укажите город" },
        { status: 400 }
      );
    }

    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Weather API key is not configured" },
        { status: 500 }
      );
    }

    const url =
      `https://api.weatherapi.com/v1/forecast.json` +
      `?key=${apiKey}` +
      `&q=${encodeURIComponent(city)}` +
      `&days=3` +
      `&aqi=no` +
      `&alerts=no`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Не удалось получить погоду",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      location: {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
        localtime: data.location.localtime,
      },
      current: {
        temp_c: data.current.temp_c,
        feelslike_c: data.current.feelslike_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        wind_kph: data.current.wind_kph,
        humidity: data.current.humidity,
      },
      forecast: data.forecast.forecastday.map((day) => ({
        date: day.date,
        max_temp_c: day.day.maxtemp_c,
        min_temp_c: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        chance_of_rain: day.day.daily_chance_of_rain,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
