export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      document_shares: {
        Row: {
          created_at: string
          document_id: string
          id: string
          role: string
          shared_with_user_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          role?: string
          shared_with_user_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          role?: string
          shared_with_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_shares_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          doc_type: string
          file_url: string | null
          id: string
          metadata: Json | null
          project_id: string | null
          title: string
          updated_at: string
          user_id: string
          version: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          doc_type?: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string | null
          title: string
          updated_at?: string
          user_id: string
          version?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          doc_type?: string
          file_url?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          version?: number
        }
        Relationships: []
      }
      password_change_requests: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          request_token: string
          used: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          request_token: string
          used?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          request_token?: string
          used?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email_verified: boolean | null
          first_name: string | null
          id: string
          language: string | null
          last_name: string | null
          notification_preferences: Json | null
          phone: string | null
          security_preferences: Json | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          id: string
          language?: string | null
          last_name?: string | null
          notification_preferences?: Json | null
          phone?: string | null
          security_preferences?: Json | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email_verified?: boolean | null
          first_name?: string | null
          id?: string
          language?: string | null
          last_name?: string | null
          notification_preferences?: Json | null
          phone?: string | null
          security_preferences?: Json | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          ai_model: string
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          name: string
          status: string
          tech_stack: string[] | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_model?: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          status?: string
          tech_stack?: string[] | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_model?: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          status?: string
          tech_stack?: string[] | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      security_audit_logs: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          expires_at: string
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_activity: string | null
          session_token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          session_token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          session_token?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
