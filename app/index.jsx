import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartPage = () => {
        return <Redirect href={'/home'} />;
    
};

export default StartPage;
