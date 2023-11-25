import { StyleSheet, Text, View, BackHandler, ScrollView, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IGetProductDetail } from '.';
import Detailrow from './components/Detailrow';
import { RootStackScreenProps } from '../config/routeParam';

export type DetailParams = {
    url: string;
}

const Detail = ({
    route: {
      params: { url },
    },
  }: RootStackScreenProps<'Detail'>) => {

    const [data, setData] = useState<IGetProductDetail | null>(null)

    useEffect(() => {
        fetchProduct();
    },[url])

    const fetchProduct = async() => {
        try{
            const response = await fetch(url)
            const productResponse: IGetProductDetail = await response.json()
            setData(productResponse)
        } catch (error) {
            console.log('error');
        }
    }


  return (
    <>
    <View>
        <Detailrow title={data?.title ?? "-"} price={data?.price ?? "-"} description={data?.description ?? "-"} category={data?.category ?? "-"} image={data?.image ?? "https://southeastasia1-mediap.svc.ms/transform/thumbnail?provider=spo&inputFormat=png&cs=fFNQTw&docid=https%3A%2F%2Fbinusianorg-my.sharepoint.com%3A443%2F_api%2Fv2.0%2Fdrives%2Fb!2QgqfpAKyEOVy8V04OZk6evpuYKML5pCuSDC_u70meQLYk1HpGomTqUi50C22nlc%2Fitems%2F01RFE46HFNYPZOM2XBMZAZONN7XDS62WVZ%3Fversion%3DPublished&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYmludXNpYW5vcmctbXkuc2hhcmVwb2ludC5jb21AMzQ4NWI5NjMtODJiYS00YTZmLTgxMGYtYjVjYzIyNmZmODk4IiwiaXNzIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwIiwibmJmIjoiMTcwMDgyNzIwMCIsImV4cCI6IjE3MDA4NDg4MDAiLCJlbmRwb2ludHVybCI6ImdBSnJTdS9DKzJza3RkUUNoc2luT3VzT1duaGdST1FxcWNzbDZ2aHlLbUk9IiwiZW5kcG9pbnR1cmxMZW5ndGgiOiIxMjEiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsInZlciI6Imhhc2hlZHByb29mdG9rZW4iLCJzaXRlaWQiOiJOMlV5WVRBNFpEa3RNR0U1TUMwME0yTTRMVGsxWTJJdFl6VTNOR1V3WlRZMk5HVTUiLCJzaWduaW5fc3RhdGUiOiJbXCJrbXNpXCJdIiwibmFtZWlkIjoiMCMuZnxtZW1iZXJzaGlwfHN0ZWZhbnVzLndpbHNvbkBiaW51cy5hYy5pZCIsIm5paSI6Im1pY3Jvc29mdC5zaGFyZXBvaW50IiwiaXN1c2VyIjoidHJ1ZSIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMyMDAyMjFjODY2OTJAbGl2ZS5jb20iLCJzaWQiOiIzOTdiNGVlNC0zOGZjLTRmZTctYmFjYS0yNjQwNGMxMTQyNjIiLCJ0dCI6IjAiLCJpcGFkZHIiOiIzNi43MC4yNDIuMTg2Iiwic25pZCI6IjYiLCJzdHAiOiJ0In0.djzvYkGcrBdIw1R01BHyYNVYScY_3x0xnMAkJV3JHvQ&cTag=%22c%3A%7BE6F2C3AD-E16A-4166-9735-BFB8E5ED5AB9%7D%2C2%22&encodeFailures=1&width=270&height=270&srcWidth=1080&srcHeight=1080"}/>
    </View>
    </>
  )
}

export default Detail

const styles = StyleSheet.create({
})