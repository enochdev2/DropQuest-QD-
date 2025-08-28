"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"
// import Image from "next/image"
import toast from "react-hot-toast"

export default function PointExchangeManagement() {
  const [tokenSlots, setTokenSlots] = useState(() => {
    const slots = Array(50)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        isConfigured: index < 5,
        tokenName:
          index === 0
            ? "GLM"
            : index === 1
            ? "ETH"
            : index === 2
            ? "BTC"
            : index === 3
            ? "USDT"
            : index === 4
            ? "BNB"
            : "",
        pointRatio:
          index === 0 ? 1000 : index === 1 ? 2000 : index === 2 ? 50000 : index === 3 ? 100 : index === 4 ? 300 : 0,
        logoUrl: index < 5 ? "/New folder/src/assets/dqcoin.png" : null,
      }))
    return slots
  })

  const [exchangeHistory] = useState([
    { id: 1, name: "Test1", telegram: "@test1", token: "GLM", points: 1000 },
    { id: 2, name: "Test2", telegram: "@test2", token: "GLM", points: 2000 },
    { id: 3, name: "Test3", telegram: "@test3", token: "GLM", points: 32000 },
  ])

  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [configData, setConfigData] = useState({
    tokenName: "",
    pointRatio: "",
    logoFile: null,
  })

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot)
    setConfigData({
      tokenName: slot.tokenName || "",
      pointRatio: slot.pointRatio?.toString() || "",
      logoFile: null,
    })
    setConfigDialogOpen(true)
  }

  const handleSaveConfig = () => {
    if (!configData.tokenName || !configData.pointRatio) {
      toast.error("Please fill in all required fields")
      return
    }

    const pointRatio = parseInt(configData.pointRatio)
    if (isNaN(pointRatio) || pointRatio <= 0) {
      toast.error("Please enter a valid point ratio")
      return
    }

    setTokenSlots(
      tokenSlots.map((slot) =>
        slot.id === selectedSlot.id
          ? {
              ...slot,
              isConfigured: true,
              tokenName: configData.tokenName,
              pointRatio: pointRatio,
              logoUrl: configData.logoFile ? URL.createObjectURL(configData.logoFile) : slot.logoUrl,
            }
          : slot
      )
    )

    toast.success("Token slot configured successfully")
    setConfigDialogOpen(false)
    setSelectedSlot(null)
    setConfigData({ tokenName: "", pointRatio: "", logoFile: null })
  }

  const handleReset = () => {
    if (selectedSlot) {
      setTokenSlots(
        tokenSlots.map((slot) =>
          slot.id === selectedSlot.id
            ? {
                ...slot,
                isConfigured: false,
                tokenName: "",
                pointRatio: 0,
                logoUrl: null,
              }
            : slot
        )
      )
      toast.success("Token slot reset successfully")
      setConfigDialogOpen(false)
      setSelectedSlot(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Token Slots Configuration */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Token Slots Configuration</CardTitle>
          <CardDescription className="text-gray-300">
            Configure the 50 token slots available for point exchange
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {tokenSlots.map((slot) => (
              <Card
                key={slot.id}
                className={`cursor-pointer transition-all duration-200 ${
                  slot.isConfigured
                    ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    : "bg-gray-900 border-gray-800 hover:bg-gray-800"
                }`}
                onClick={() => handleSlotClick(slot)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-xs text-gray-400 mb-2">Slot {slot.id}</div>
                  {slot.isConfigured ? (
                    <>
                      <div className="w-8 h-8 mx-auto mb-2 bg-gray-600 rounded-full flex items-center justify-center">
                        {slot.logoUrl && (
                            <img
                                src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRUjmd1FpWDiKe0A89UUSPQ7vwJixYqqlKafYrlEq-Scn-TrKXeSD2TL--LWKomrmQcA&usqp=CAU" 
                                alt={slot.tokenName}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                            )}

                      </div>
                      <p className="font-semibold text-white text-sm">${slot.tokenName}</p>
                      <p className="text-xs text-gray-400">{slot.pointRatio} pts</p>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-xs">?</span>
                      </div>
                      <p className="text-gray-600 text-sm">NONE</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exchange Application History */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Point Exchange Application History</CardTitle>
          <CardDescription className="text-gray-300">Recent point exchange requests from users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Telegram</TableHead>
                  <TableHead className="text-white">Token</TableHead>
                  <TableHead className="text-white">Points</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exchangeHistory.map((exchange) => (
                  <TableRow key={exchange.id} className="hover:bg-gray-700 text-white">
                    <TableCell className="font-medium">{exchange.name}</TableCell>
                    <TableCell>{exchange.telegram}</TableCell>
                    <TableCell>{exchange.token}</TableCell>
                    <TableCell>{exchange.points.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-600 text-white">Completed</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Configure Token Slot {selectedSlot?.id}</DialogTitle>
            <DialogDescription className="text-gray-300">Set up the token information for this slot</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="tokenName" className="text-white">
                Token Name
              </Label>
              <Input
                id="tokenName"
                value={configData.tokenName}
                onChange={(e) => setConfigData({ ...configData, tokenName: e.target.value })}
                placeholder="e.g., GLM"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="pointRatio" className="text-white">
                Point Ratio (Points per 1 Token)
              </Label>
              <Input
                id="pointRatio"
                type="number"
                value={configData.pointRatio}
                onChange={(e) => setConfigData({ ...configData, pointRatio: e.target.value })}
                placeholder="e.g., 1000"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="logo" className="text-white">
                Logo Upload
              </Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => setConfigData({ ...configData, logoFile: e.target.files?.[0] || null })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-gray-600 text-white hover:bg-red-700 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfigDialogOpen(false)}
              className="border-gray-600 text-blue-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveConfig} className="bg-blue-600 hover:bg-blue-700">
              Set
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
