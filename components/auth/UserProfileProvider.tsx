"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "@/firebase/config";

import { getUserProfile } from "@/services/user.service";
import { UserProfile } from "@/types/user";

interface UserProfileContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

const UserProfileContext =
  createContext<UserProfileContextValue>({
    user: null,
    profile: null,
    loading: true,
  });

interface UserProfileProviderProps {
  children: React.ReactNode;
}

export default function UserProfileProvider({
  children,
}: UserProfileProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          setUser(currentUser);

          if (!currentUser) {
            setProfile(null);
            setLoading(false);
            return;
          }

          try {
            const userProfile =
              await getUserProfile(
                currentUser.uid
              );

            setProfile(userProfile);
          } catch (error) {
            console.error(
              "Failed to load user profile:",
              error
            );

            setProfile(null);
          } finally {
            setLoading(false);
          }
        }
      );

    return unsubscribe;
  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        user,
        profile,
        loading,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(
    UserProfileContext
  );
}