import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';


 export async function GetData(name) {
    const data = Papa.parse(await fetchCsv(name), {encoding: "ISO-8859-1"});
    return data;
}

async function fetchCsv(name) {
    const response = await fetch(name);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}
