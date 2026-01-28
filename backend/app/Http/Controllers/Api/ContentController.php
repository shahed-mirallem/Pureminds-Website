<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class ContentController extends Controller
{
    /**
     * Get platform content
     */
    public function index(): JsonResponse
    {
        $content = [
            'hero' => [
                'title' => 'PUREMINDS',
                'subtitle' => 'WHERE THOUGHT BECOMES FORM',
            ],
            'sections' => [
                [
                    'title' => 'Elevate Your Vision',
                    'description' => 'We craft digital experiences that transcend ordinary boundaries, merging artistry with technology to create unforgettable moments.',
                ],
            ],
            'expertise' => [
                [
                    'title' => 'Creative Strategy',
                    'description' => 'Purposeful design that resonates with your audience',
                ],
                [
                    'title' => 'Digital Innovation',
                    'description' => 'Cutting-edge technology meets artistic expression',
                ],
                [
                    'title' => 'Brand Evolution',
                    'description' => 'Transformative experiences that define legacies',
                ],
            ],
        ];

        return response()->json($content);
    }

    /**
     * Store contact form submission
     */
    public function contact(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:1000'],
        ]);

        // In a real application, you would store this in the database
        // or send an email notification

        return response()->json([
            'message' => 'Thank you for your message. We will be in touch soon.',
            'success' => true,
        ], 201);
    }
}
