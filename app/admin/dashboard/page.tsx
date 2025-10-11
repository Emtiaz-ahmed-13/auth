import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/getSession";
import { CreditCard, DollarSign, TrendingUp, Users } from "lucide-react";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome to your admin dashboard
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Revenue Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.87</div>
              <p className="text-xs text-green-600">+20.1% from last month</p>
            </CardContent>
          </Card>

          {/* Subscriptions Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-green-600">+180.1% from last month</p>
            </CardContent>
          </Card>

          {/* Sales Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-green-600">+19% from last month</p>
            </CardContent>
          </Card>

          {/* Active Now Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-green-600">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Signups */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Plan</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4">john@example.com</td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Pro
                        </span>
                      </td>
                      <td className="py-3 px-4">2024-04-16</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Jane Smith</td>
                      <td className="py-3 px-4">jane@example.com</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Basic
                        </span>
                      </td>
                      <td className="py-3 px-4">2024-04-15</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Mike Johnson</td>
                      <td className="py-3 px-4">mike@example.com</td>
                      <td className="py-3 px-4">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Premium
                        </span>
                      </td>
                      <td className="py-3 px-4">2024-04-14</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
